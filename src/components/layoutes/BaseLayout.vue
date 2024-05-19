<template>
  <app-bar />

  <div class="site-background">
    <v-container>
      <v-row class="d-flex justify-space-around" style="padding-top: 75px;">
        <v-col cols="8" class="">
          <slot name="component"></slot>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <app-footer />
</template>


<script lang="ts" setup>
import AppBar from '@/components/base/AppBar.vue';
import AppFooter from '@/components/base/AppFooter.vue';
</script>

<style>
.site-background {
  /* background-color: #800000b5; */
}
</style>