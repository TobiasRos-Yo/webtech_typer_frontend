  <template>
      <div>
        <pre  class="words-box" v-if="words">{{ words }}</pre>
        <p v-else>Loading...</p>
      </div>
  </template>
  
  <script lang="ts">
  import {defineComponent, ref, onMounted, watch} from 'vue';
  import { getRandomWords } from '@/dictionary';
  import {wordCount} from "@/state";
  
  export default defineComponent({
    name: 'Words',
    setup() {
      const words = ref<string | null>(null);
  
      const getWords = async () => {
        try {
          words.value = await getRandomWords(wordCount.value);
        } catch (error) {
          console.error('Error fetching words:', error);
        }
      };

      onMounted(getWords);

      watch(wordCount, getWords);
  
      return {
        words
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
</style>