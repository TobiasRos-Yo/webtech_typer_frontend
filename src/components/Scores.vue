<template>
  <div>
    <template v-if="highscore">
      <h2>Highscore</h2>
      <div>{{ highscore.score }}</div>
      <h3>Last Scores</h3>
      <div v-for="score in scores">{{ score.score }}</div>
    </template>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, type Ref, ref} from 'vue'
import axios, {type AxiosResponse} from "axios";
import type {Score} from "@/types";

const scores: Ref<Score[]> = ref([]);
const highscore: Ref<Score | null> = ref(null);

//von thing-frontend inspiriert
async function loadScores () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/typer/recentscores';
  const response: AxiosResponse = await axios.get(endpoint);
  const responseData: Score[] = response.data;
  responseData.forEach((score: Score) => {
    console.log('score:', score); // Debug: Log
    scores.value.push(score);
  })
  await setHighscore();
}

async function setHighscore() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/typer/highscore';
  const response: AxiosResponse = await axios.get(endpoint);
  highscore.value = response.data;
}

onMounted(async () => {
  await loadScores();
})

</script>

<style scoped>

</style>