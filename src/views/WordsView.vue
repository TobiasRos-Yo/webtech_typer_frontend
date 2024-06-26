<script setup lang="ts">
import Settings from '../components/Settings.vue'
import Words from '../components/Words.vue'
</script>

<template>
  <main>
    <div class="logo-settings-container">
      <div class="row d-flex align-items-end">
        <div class="col-2">
          <img id="logo" src="../assets/typerlogo2.png" alt="typerlogo">
        </div>
        <div class="col">
          <Settings />
        </div>
      </div>
    </div>
    <div>
      <Words />
    </div>
  </main>
</template>

<style scoped>
.logo-settings-container {
  position: fixed;
  top: 5%;
  z-index: 9999; /*damit dropdowns über der words-box sind*/
}

#logo {
  width: 100%;
}
</style>