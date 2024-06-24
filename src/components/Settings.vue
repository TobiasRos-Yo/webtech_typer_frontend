<script setup lang="ts">

import {RouterLink} from "vue-router";
import { wordCount} from "@/state";
import {mode} from "@/state";

function updateWordCount(count: number) {
  wordCount.value = count;
}

function updateMode(diff: string) {
  mode.value = diff;
}

</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
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
            <li><button class="dropdown-item" type="button" @click="updateMode('easy')">Easy</button></li>
            <li><button class="dropdown-item" type="button" @click="updateMode('medium')">Medium</button></li>
            <li><button class="dropdown-item" type="button" @click="updateMode('hard')">Hard</button></li>
          </ul>
        </div>
      </div>
      <div class="col">
        <div class="dropdown">
          <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          >
            Anzahl/Zeit
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" @click="updateWordCount(10)">10 </button></li>
            <li><button class="dropdown-item" type="button" @click="updateWordCount(25)">25</button></li>
            <li><button class="dropdown-item" type="button" @click="updateWordCount(50)">50</button></li>
          </ul>
        </div>
      </div>
      <div class="col">
        <RouterLink to="/scores" class="button">
          Scores
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>