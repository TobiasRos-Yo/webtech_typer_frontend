<script setup lang="ts">

import {RouterLink} from "vue-router";
import { wordCount} from "@/state";
import {mode} from "@/state";
import Scores from "@/components/Scores.vue";

function updateWordCount(count: number) {
  wordCount.value = count;
}

function updateMode(diff: string) {
  mode.value = diff;
}

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <button id="leaderboardbutton" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#scoresModal" @keydown.space.prevent>
          <img id="icon" src="../assets/leaderboardiconwhite.png" alt="leaderboard" />
        </button>
      </div>
      <div class="col">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" @keydown.space.prevent>
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
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" @keydown.space.prevent>
            Amount
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" @click="updateWordCount(10)">10 </button></li>
            <li><button class="dropdown-item" type="button" @click="updateWordCount(25)">25</button></li>
            <li><button class="dropdown-item" type="button" @click="updateWordCount(50)">50</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- popup scores Modal -->
  <div class="modal fade" id="scoresModal" tabindex="-1" role="dialog" aria-labelledby="scoresModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="scoresModalLabel">Scores</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <Scores />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding-bottom: 1%;
}

#leaderboardbutton {
  border: none;
  appearance: none;
  background-color: inherit;
  width: 10%;
  padding: 0;
}
#leaderboardbutton:focus-visible {
  box-shadow: none;
}

#icon {
  width: 100%;
}

#scoresModal {
  --bs-modal-bg: black;
  --bs-modal-color: white;
  backdrop-filter: blur(5px);
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.close {
  border: none;
  appearance: none;
  background-color: inherit;
  color: white;
}

.btn-secondary {
  border: none;
  appearance: none;
  background-color: inherit;
}
</style>