<script setup lang="ts"></script>

<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<style>

.home-sections {
  border-bottom: 0.5px solid #f5e5e5 !important;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 500px;
}

.loading-section {
  border-bottom: 0.5px solid #f5e5e5 !important;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
