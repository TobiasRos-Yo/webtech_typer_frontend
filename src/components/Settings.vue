<script setup lang="ts">

import {RouterLink} from "vue-router";
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
            Worttyp
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button">Substantive</button></li>
            <li><button class="dropdown-item" type="button">Verben</button></li>
            <li><button class="dropdown-item" type="button">Adjektive</button></li>
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
            Modus
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button">Wortzahl</button></li>
            <li><button class="dropdown-item" type="button">Zeit</button></li>
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
            <li><button class="dropdown-item" type="button">10 </button></li>
            <li><button class="dropdown-item" type="button">20</button></li>
            <li><button class="dropdown-item" type="button">50</button></li>
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