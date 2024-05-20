<template>
  <section class="home home-bg">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center" style="height: 500px;">
        <v-row>
          <v-col cols="12">
            <h1 class="home-title">Explore, Discover, Inspire.</h1>
          </v-col>
          <v-col>
            <em class="home-body">
              “Explore the world through words; where stories become journeys and ideas take flight.”
            </em>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <!-- Right card -->
          <router-link class="w-100" to="">
            <v-col cols="12" class="pa-0 d-flex justify-end">
              <div class="d-flex align-center justify-start">
                <v-icon class="versatility-icon card-icon"
                  :class="{ 'versatility-icon-hovered': versatilityHovered }">mdi-earth</v-icon>
              </div>
              <v-card class="home-card right-border-card ml-3 versatility-card" @mouseover="versatilityHovered = true"
                @mouseleave="versatilityHovered = false">
                <strong class="card-hint">Versatility</strong>
                Discover diverse topics, all in one spot.
              </v-card>
            </v-col>
          </router-link>

          <router-link class="w-100" to="">
            <!-- Left card -->
            <v-col cols="12" class="pa-0 d-flex justify-end">
              <v-card class="home-card left-border-card mr-3 social-card" @mouseover="socialHovered = true"
                @mouseleave="socialHovered = false">
                <strong class="card-hint">Streamline</strong>
                Real-Time updates.
              </v-card>
              <div class="d-flex align-center justify-end">
                <v-icon class="social-icon"
                  :class="{ 'social-icon-hovered': socialHovered }">mdi-comment-multiple</v-icon>
              </div>
            </v-col>
          </router-link>

          <router-link to="" class="w-100">
            <!-- Right card -->
            <v-col cols="12" class="pa-0 d-flex justify-end">
              <div class="d-flex align-center justify-start">
                <v-icon class="idea-icon card-icon"
                  :class="{ 'idea-icon-hovered': ideaHovered }">mdi-lightbulb-on-outline</v-icon>
              </div>
              <v-card class="home-card right-border-card ml-3 idea-card" @mouseover="ideaHovered = true"
                @mouseleave="ideaHovered = false">
                <strong class="card-hint">Innovative</strong>
                All of the stories embody innovation.
              </v-card>
            </v-col>
          </router-link>

          <router-link to="" class="w-100">
            <!-- Left card -->
            <v-col cols="12" class="pa-0 d-flex justify-end">
              <v-card class="home-card left-border-card mr-3 easy-card" @mouseover="easyHovered = true"
                @mouseleave="easyHovered = false">
                <strong class="card-hint">Effortless</strong>
                StoryMith is designed to be easy to use.
              </v-card>
              <div class="d-flex align-center justify-end">
                <v-icon class="easy-icon"
                  :class="{ 'social-icon-hovered': easyHovered }">mdi-cursor-default-click-outline</v-icon>
              </div>
            </v-col>
          </router-link>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
const versatilityHovered = ref(false);
const socialHovered = ref(false);
const ideaHovered = ref(false);
const easyHovered = ref(false);
</script>

<script lang="ts" setup>
import { ref } from "vue";
</script>



<style scoped>
.home {
  margin-top: 15px;
  margin-bottom: 80px;
  border-bottom: 0.5px solid #f5e5e5 !important;
}

.home-title {
  font-size: 50px;
  font-weight: 700;
  font-family: system-ui;
}

.home-bg {
  background-image: url(/images/world_map_preview.png);
  background-repeat: no-repeat;
  background-position: 300px 240px;
}

.home-body {
  font-size: 19px;
  text-align: justify;
  font-weight: 700;
  color: #b06060;
  font-family: unset;
}

.home-card {
  padding: 20px;
  width: 75%;
  margin-bottom: 10px;
  transition: 0.4s;
}

.home-card:hover {
  scale: 1.05;
}

.versatility-icon-hovered,
.idea-icon-hovered,
.social-icon-hovered {
  scale: 1.5;
}

.versatility-icon-hovered,
.idea-icon-hovered {
  margin-right: 15px;
}

.social-icon-hovered {
  margin-left: 15px;
}

.right-border-card {
  border-right: 20px solid #b06060;
  border-radius: 19px;
  box-shadow: 17px 3px 19px -4px #938f8f;
}

.left-border-card {
  border-left: 20px solid #b06060;
  border-radius: 19px;
  box-shadow: -17px 3px 19px -4px #938f8f;
}

.card-hint::after {
  margin-left: 3px !important;
  border-right: 2px solid rgb(196, 196, 196) !important;
  content: "";
}

.social-card {
  border-color: #2196f3;
}

.idea-card {
  border-color: #f1ad07;
}

.social-icon {
  color: #2196f3;
  transition: 0.4s;
}

.easy-icon {
  color: #6e4838;
  transition: 0.4s;
}

.idea-icon {
  color: #f1ad07;
  transition: 0.4s;
}

.versatility-card {
  border-color: #57c373;
}

.easy-card {
  border-color: #6e4838;
}

.versatility-icon {
  color: #57c373;
  transition: 0.4s;
}
</style>