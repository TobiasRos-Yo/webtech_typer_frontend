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

      const reset = () => {
        currentPosition.value = 0;
        inputStatus.value = [];
      };
  
      const getWords = async () => {
        try {
          words.value = await getRandomWords(wordCount.value);
          reset();
          inputStatus.value = new Array(words.value.length).fill(Status.UNTYPED);
        } catch (error) {
          console.error('Error fetching words:', error);
        }
      };

      const checkInput = (event: KeyboardEvent) => {
        const input = event.key;

        if (input === 'Backspace') {
          currentPosition.value--;
          inputStatus.value[currentPosition.value] = Status.UNTYPED;
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
      };

      onBeforeMount(() => {
        window.addEventListener('keydown', checkInput);
      });

      onBeforeUnmount(() => {
        window.removeEventListener('keydown', checkInput);
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
  border: 1px solid #000;
  border-radius: 8px;
  word-break: break-word; /* Zeilenumbruch aktivieren */
  white-space: pre-wrap; /* Erlaubt Zeilenumbrüche in <pre> */
  background-color: #333333;
}

.untyped {
  color: grey;
}

.typed {
  color: white;
}

.incorrect {
  color: red;
}
</style>