<template>
  <base-layout>
    <template #component>
      <!-- Top page -->
      <head-cover-component />
      <!-- Topics -->
      <topics-component />
      <!-- Stories -->
      <stories-component />
      <!-- Globe -->
      <globe-component />
    </template>
  </base-layout>
</template>

<script lang="ts">
export default defineComponent({
  mounted() {}
})
</script>

<script lang="ts" setup>
import BaseLayout from '@/components/layoutes/BaseLayout.vue'
import HeadCoverComponent from '@/components/home/HeadCoverComponent.vue'
import GlobeComponent from '@/components/home/GlobeComponent.vue'
import TopicsComponent from '@/components/home/TopicsComponent.vue'
import StoriesComponent from '@/components/home/StoriesComponent.vue'
import { defineComponent } from 'vue'
</script>
