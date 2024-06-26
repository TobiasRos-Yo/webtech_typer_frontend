  <template>
      <div>
        <div class="words-box" v-if="words">
          <!--hier Blur Effekt funktioniert irgendwie-->
          <div class="score-screen" v-if="showScoreScreen" :class="{blur: showScoreScreen}">
            <div>Time: {{ time }}s</div>
            <div>WPM: {{ wpm }}</div>
            <div>Accuracy: {{ acc }}%</div>
          </div>
            <div class="words">
              <span v-for="(char, index) in words" :key="index" :class="inputStatus[index]">
                {{ char }}
              </span>
            </div>
        </div>
        <p v-else>Loading...</p>
        <div class="space-restart" v-if="showScoreScreen">
          < press space to restart >
        </div>
      </div>
  </template>
  
  <script lang="ts">
  import {defineComponent, ref, onMounted, watch, onBeforeMount, onBeforeUnmount} from 'vue';
  import { getRandomWords } from '@/dictionary';
  import {wordCount} from "@/state";
  import { mode } from '@/state';
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

      const showScoreScreen = ref(false);
      const time = ref(0);
      const wpm = ref(0);
      const acc = ref(0);

      let startTime: number | null = null;
      let endTime: number | null = null;
      let isKeyListenerAdded = ref(false);
      let wordsCheck: string[] = [];
      let inputCheck = '';
      let mistakes = 0;

      const reset = () => {
        showScoreScreen.value = false;
        time.value = 0;
        wpm.value = 0;
        acc.value = 0;

        currentPosition.value = 0;
        inputStatus.value = [];
        startTime = null;
        endTime = null;
        inputCheck = '';
        mistakes = 0;
      };
  
      const getWords = async () => {
        try {
          words.value = await getRandomWords(wordCount.value, mode.value);
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

        // Wenn der Text komplett getippt wurde, und Leertaste gedrückt wird, wird alles zurückgesetzt
        if (currentPosition.value === words.value.length) {
          if (input === ' ') {
            getWords();
          }
          return;
        }

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
          showScoreScreen.value = true;
          }
      };

      const calcScores = () => {
        if (endTime === null || startTime === null) {
          return;
        }

        const inputWords = inputCheck.split(' ');
        const correctWords = inputWords.filter(word => wordsCheck.includes(word)); // Filtert die korrekten Wörter aus dem Input
        const correctWordsCount = correctWords.length;
        time.value = (endTime - startTime) / 1000;
        console.log('Time:', time);
        // WPM: Anzahl der Buchstaben in den korrekten Wörtern+Leerzeichen / 5(normalisieren auf Standard Wortlänge) / Zeit * 60
        wpm.value = (correctWords.reduce((sum, word) => sum + word.length, 0) + correctWordsCount) / 5 / time.value * 60; //
        console.log('WPM:', wpm);
        acc.value = ((words.value.length - mistakes) / words.value.length) * 100; // TODO: runden
        console.log('Accuracy:', acc);

        const score: Score = {
          score: wpm.value,
          acc: acc.value,
          mode: mode.value
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
      watch(mode, getWords);
  
      return {
        words,
        currentPosition,
        inputStatus,
        showScoreScreen,
        time,
        wpm,
        acc
      };
    }
  });
  </script>

<style scoped>

.words-box {
  position: relative;
  font-size: 24px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  word-break: break-word; /* Zeilenumbruch aktivieren */
  white-space: pre-line; /* Erlaubt Zeilenumbrüche in <pre> */
  background-color: #333333;
}

.score-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  font-size: 18px;
}

.blur {
  backdrop-filter: blur(10px);
}

.space-restart {
  text-align: center;
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