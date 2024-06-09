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

  enum Status {
    ACTIVE = 'active',
    UNTYPED = 'untyped',
    TYPED = 'typed',
    INCORRECT = 'incorrect'
  }
  
  export default defineComponent({
    name: 'Words',
    setup() {
      const words = ref<string | null>(null);

      const currentPosition = ref(0);
      const inputStatus = ref<Array<Status>>([]);

      let startTime: number | null = null;
      let endTime: number | null = null;
      let isKeyListenerAdded = ref(false);

      const reset = () => {
        currentPosition.value = 0;
        inputStatus.value = [];
        startTime = null;
        endTime = null;
        if (!isKeyListenerAdded.value) {
          window.addEventListener('keydown', checkInput);
          isKeyListenerAdded.value = true;
        }
      };
  
      const getWords = async () => {
        try {
          words.value = await getRandomWords(wordCount.value);
          reset();
          inputStatus.value = new Array(words.value.length).fill(Status.UNTYPED);
          inputStatus.value[0] = Status.ACTIVE;
        } catch (error) {
          console.error('Error fetching words:', error);
        }
      };

      const checkInput = (event: KeyboardEvent) => {
        const input = event.key;

        if (startTime === null){
          startTime = Date.now();
        }

        if (input === 'Backspace') {
          if (currentPosition.value !== 0) {
            currentPosition.value--;
            inputStatus.value[currentPosition.value] = Status.ACTIVE;
            inputStatus.value[currentPosition.value + 1] = Status.UNTYPED;
          }
          return;
        }
        // Ignoriert tasten, die einen String erzeugen der länger als 1 Zeichen ist (z.B. Shift)
        if (input.length !== 1) {
          return;
        }
        // ascii Überprüfung unnötig!?

        const currentChar = words.value?.charAt(currentPosition.value);
        console.log("currentChar", currentChar)

        if (input === currentChar) {
          console.log("richtig");
          inputStatus.value[currentPosition.value] = Status.TYPED;
        } else {
          // Handle incorrect input
          console.error('Incorrect input');
          inputStatus.value[currentPosition.value] = Status.INCORRECT;
        }
        currentPosition.value++;
        inputStatus.value[currentPosition.value] = Status.ACTIVE;

        if (currentPosition.value === words.value?.length) {
          endTime = Date.now();
          const time = (endTime - startTime) / 1000;
          console.log('Time:', time);
          window.removeEventListener('keydown', checkInput);
          isKeyListenerAdded.value = false;
          }
      };

      onBeforeMount(() => {
        window.addEventListener('keydown', checkInput);
        isKeyListenerAdded.value = true;
      });

      onBeforeUnmount(() => {
        window.removeEventListener('keydown', checkInput);
        isKeyListenerAdded.value = false;
      });

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