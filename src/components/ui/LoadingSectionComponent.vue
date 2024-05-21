<template>
  <section name="loading-globe" class="loading-section" v-if="isLoading">
    <v-row v-if="isStories">
      <v-col v-for="el of [1,2,3,4]" :key="el">
        <v-skeleton-loader color="#b060602b" type="article"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else-if="isTopics">
      <v-col cols="12" class="d-flex justify-center">
        <self-building-square-spinner
          :animation-duration="6000"
          :size="40"
          color="#b06060"
        />
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <small>{{ _loadingMessage }}</small>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="d-flex justify-center">
        <flower-spinner :animation-duration="2500" :size="55" color="#b06060" />
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <small>{{ _loadingMessage }}</small>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { SelfBuildingSquareSpinner, FlowerSpinner } from 'epic-spinners'
import { ref, watch, defineComponent } from 'vue'

export default defineComponent({
  components: { FlowerSpinner, SelfBuildingSquareSpinner },
  props: {
    isStories: {
      type: Boolean,
      required: false
    },
    isTopics: {
      type: Boolean,
      required: false
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    loadingMessage: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const _loadingMessage = ref(props.loadingMessage)
    let interval: number | null = null

    watch(
      () => props.isLoading,
      (newVal) => {
        if (newVal) {
          _loadingMessage.value = props.loadingMessage
          let count = 0
          if (interval) {
            clearInterval(interval)
          }
          interval = setInterval(() => {
            count = (count % 3) + 1
            _loadingMessage.value = props.loadingMessage + '.'.repeat(count)
          }, 1000)
        } else if (interval) {
          clearInterval(interval)
        }
      },
      { immediate: true }
    )

    return {
      _loadingMessage
    }
  }
})
</script>
