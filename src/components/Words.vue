<template>
    <div>
      <h2>Fetched Words</h2>
      <pre v-if="words">{{ words }}</pre>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getRandomWords } from '../dictionary';
  
  export default defineComponent({
    name: 'Words',
    setup() {
      const words = ref<string | null>(null);
  
      onMounted(async () => {
        try {
          words.value = await getRandomWords(10);
        } catch (error) {
          console.error('Error fetching words:', error);
        }
      });
  
      return {
        words
      };
    }
  });
  </script>

<style scoped>

</style>