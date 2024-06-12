  <template>
      <div>
        <pre  class="words-box" v-if="words">
          <span v-for="(char, index) in words" :key="index" :class="inputStatus[index]">{{ char }}</span>
        </pre>
        <p v-else>Loading...</p>
      </div>
  </template>
  
  <script lang="ts">
  import {defineComponent, ref, onMounted, watch, onBeforeMount, onBeforeUnmount} from 'vue';
  import { getRandomWords } from '@/dictionary';
  import {wordCount} from "@/state";
  import type {Score} from "@/types";
  import axios, {type AxiosResponse} from "axios";

  enum Status {
    ACTIVE = 'active',
    UNTYPED = 'untyped',
    TYPED = 'typed',
    INCORRECT = 'incorrect'
  }
  
  export default defineComponent({
    name: 'Words',
    setup() {
      const words = ref<string>('');

      const currentPosition = ref(0);
      const inputStatus = ref<Array<Status>>([]);

      let startTime: number | null = null;
      let endTime: number | null = null;
      let isKeyListenerAdded = ref(false);
      let wordsCheck: string[] = [];
      let inputCheck = '';
      let mistakes = 0;

      const reset = () => {
        currentPosition.value = 0;
        inputStatus.value = [];
        startTime = null;
        endTime = null;
        inputCheck = '';
        mistakes = 0;
        addKeyListener();
      };
  
      const getWords = async () => {
        try {
          words.value = await getRandomWords(wordCount.value);
          reset();
          inputStatus.value = new Array(words.value.length).fill(Status.UNTYPED);
          inputStatus.value[0] = Status.ACTIVE;
          wordsCheck = words.value.split(' ');
        } catch (error) {
          console.error('Error fetching words:', error);
        }
      };

      const checkInput = (event: KeyboardEvent) => {
        const input = event.key;

        if (input === 'Backspace') {
          if (currentPosition.value !== 0) {
            currentPosition.value--;
            inputStatus.value[currentPosition.value] = Status.ACTIVE;
            inputStatus.value[currentPosition.value + 1] = Status.UNTYPED;
            inputCheck = inputCheck.slice(0, -1);
          }
          return;
        }
        // Ignoriert tasten, die einen String erzeugen der länger als 1 Zeichen ist (z.B. Shift)
        if (input.length !== 1) {
          return;
        }
        // ascii Überprüfung unnötig!?

        //Zeit wird erst mit dem ersten Buchstaben gestartet
        if (startTime === null){
          startTime = Date.now();
        }

        const currentChar = words.value.charAt(currentPosition.value);

        inputCheck += input;

        if (input === currentChar) {
          inputStatus.value[currentPosition.value] = Status.TYPED;
        } else {
          inputStatus.value[currentPosition.value] = Status.INCORRECT;
          mistakes++;
        }
        currentPosition.value++;
        inputStatus.value[currentPosition.value] = Status.ACTIVE;

        if (currentPosition.value === words.value.length) {
          endTime = Date.now();
          calcScores();
          removeKeyListener();
          }
      };

      const calcScores = () => {
        if (endTime === null || startTime === null) {
          return;
        }

        const inputWords = inputCheck.split(' ');
        const correctWords = inputWords.filter(word => wordsCheck.includes(word)); // Filtert die korrekten Wörter aus dem Input
        const correctWordsCount = correctWords.length;
        const time = (endTime - startTime) / 1000;
        console.log('Time:', time);
        // WPM: Anzahl der Buchstaben in den korrekten Wörtern+Leerzeichen / 5(normalisieren auf Standard Wortlänge) / Zeit * 60
        const wpm = (correctWords.reduce((sum, word) => sum + word.length, 0) + correctWordsCount-1) / 5 / time * 60; //
        console.log('WPM:', wpm);
        const acc = ((words.value.length - mistakes) / words.value.length) * 100;
        console.log('Accuracy:', acc);

        const score: Score = {
          score: wpm
        }
        saveScore(score);
      };

      async function saveScore(score: Score) {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
        const endpoint = baseUrl + '/typer';
        const response: AxiosResponse = await axios.post(endpoint, score);
        const responseData: Score = response.data;
        console.log('Success:', responseData)
      }

      const addKeyListener = () => {
        if (!isKeyListenerAdded.value) {
          window.addEventListener('keydown', checkInput);
          isKeyListenerAdded.value = true;
        }
      };

      const removeKeyListener = () => {
        if (isKeyListenerAdded.value) {
          window.removeEventListener('keydown', checkInput);
          isKeyListenerAdded.value = false;
        }
      };

      onBeforeMount(addKeyListener);
      onBeforeUnmount(removeKeyListener);

      onMounted(getWords);
      watch(wordCount, getWords);
  
      return {
        words,
        currentPosition,
        inputStatus
      };
    }
  });
  </script>

<style scoped>

.words-box {
  font-size: 24px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  word-break: break-word; /* Zeilenumbruch aktivieren */
  white-space: pre-line; /* Erlaubt Zeilenumbrüche in <pre> */
  background-color: #333333;
}

.active {
  color: grey;
  border-left: 2px darkorange solid;
  box-sizing: border-box;
}

.untyped {
  color: grey;
}

.typed {
  color: white;
}

.incorrect {
  background-color: darkred;
}
</style>