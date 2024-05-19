<script lang="ts" setup>
// const baseUrl = import.meta.env.BASE_URL;
</script>

<template>
  <v-app-bar :elevation="1" class="pa-2">
    <v-container>
      <v-row class="d-flex justify-space-around">
        <v-col cols="8">
          <v-row>
            <v-col cols="6" class="d-flex justify-start align-center">
              <router-link to="/">
                <v-app-bar-title class="logo-text">
                  StoryMith
                </v-app-bar-title>
              </router-link>
            </v-col>

            <v-col cols="6" class="d-flex justify-end align-center">
              <router-link class="app-bar-link mr-6" to="/our-story">
                Our story
              </router-link>
              <router-link class="app-bar-link mr-6" to="/membership">
                Membership
              </router-link>
              <router-link class="app-bar-link mr-6" to="/write">
                Write
              </router-link>
              <router-link class="app-bar-link mr-6" to="/signin">
                Sign in
              </router-link>

              <v-btn color="primary" class="get-started-btn" variant="tonal" rounded="xl">Get started</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style>
.logo-text {
  font-size: 36px;
  color: #800000b5;
  font-weight: 700;
  font-family: system-ui;
}

.v-toolbar-title__placeholder {
  overflow: unset !important;
}

.get-started-btn {
  /* background: #800000b5; */
  /* color: white; */
  font-family: system-ui;
  font-size: 13px;
  font-weight: 600;
}

.app-bar-link {
  color: #000000;
}
</style>