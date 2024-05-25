<template>
  <div>
    <template v-if="highscore">
      <h2>Highscore</h2>
      <div>{{ highscore }}</div>
      <h3>Last Scores</h3>
      <div v-for="score in scores">{{ score.score }}</div>
    </template>
    <div v-else>No Scores yet, start typing!</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, type Ref, ref} from 'vue'
import axios, {type AxiosResponse} from "axios";

type Score = { score: number; isHighscore: boolean }

const scores: Ref<Score[]> = ref([]);
const highscore: Ref<Score | null> = ref(null);

//von thing-frontend inspiriert
async function loadScores () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/typer';
  const response: AxiosResponse = await axios.get(endpoint);
  const responseData: Score[] = response.data;
  responseData.forEach((score: Score) => {
    console.log('score:', score); // Debug: Log
    scores.value.push(score);
    console.log('isHighscore:', score.isHighscore); // Debug: Log the highscore
    console.log('scoress:', scores.value); // Debug: Log
    if (score.isHighscore) highscore.value = score;
    console.log('Highscore found:', highscore.value); // Debug: Log the highscore
  })
}

onMounted(async () => {
  await loadScores();
})

</script>

<style scoped>

</style>