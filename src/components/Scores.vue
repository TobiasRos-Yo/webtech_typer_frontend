<template>
  <div>
    <template v-if="recentScores.length!=0">
      <div class="header-container">
        <h2>Topscores</h2>
        <div class="dropdown">
          <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          >
            Mode
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" @click="updateScoresMode('easy')">Easy</button></li>
            <li><button class="dropdown-item" type="button" @click="updateScoresMode('medium')">Medium</button></li>
            <li><button class="dropdown-item" type="button" @click="updateScoresMode('hard')">Hard</button></li>
          </ul>
        </div>
      </div>
      <div v-for="score in topScoresForSelectedMode">
        WPM: {{ score.score }} Acc: {{score.acc}}
      </div>
      <h3>Last Scores</h3>
      <div v-for="score in recentScores">WPM: {{ score.score }} Acc: {{score.acc}} Mode: {{score.mode}}</div>
    </template>
    <div v-else>No Scores yet, start typing!</div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {loadScores, recentScores, topscoresEasy, topscoresMedium, topscoresHard} from '@/scoreService'
import {selectedScoresMode} from '@/state'

const topScoresForSelectedMode = computed(() => {
  switch (selectedScoresMode.value) {
    case 'easy':
      return topscoresEasy.value;
    case 'medium':
      return topscoresMedium.value;
    case 'hard':
      return topscoresHard.value;
    default:
      return [];
  }
});

function updateScoresMode(mode: string) {
  selectedScoresMode.value = mode;
}

onMounted(async () => {
  await loadScores();
})
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
}

.btn-secondary {
  border: none;
  appearance: none;
  background-color: inherit;
}
</style>