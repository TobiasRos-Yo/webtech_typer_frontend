<template>
  <div>
    <template v-if="scores.highscore">
      <h2>Highscore</h2>
      <div>{{ scores.highscore }}</div>
      <h3>Last Scores</h3>
      <div v-for="score in scores.lastScores">{{ score }}</div>
    </template>
    <div v-else>
        No Scores yet, start typing!
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, type Ref } from 'vue'

type Scores = { highscore: number | null; lastScores: number[] }

export default {
  name: 'scores',
  data(): { scores: Ref<Scores> } {
    return {
      scores: ref({ highscore: 111, lastScores: [43, 64, 27, 98, 55] }) as Ref<Scores>
    }
  }
}
</script>
