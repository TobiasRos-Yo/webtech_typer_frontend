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
            <li><button class="dropdown-item" type="button">Action</button></li>
            <li><button class="dropdown-item" type="button">Another action</button></li>
            <li><button class="dropdown-item" type="button">Something else here</button></li>
          </ul>
        </div>
      </div>
      <div class="col">Modus</div>
      <div class="col">Anzahl/Zeit</div>
      <div class="col">
        <RouterLink to="/scores" class="button">
          Scores
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>