<template>
  <section class="topics">
    <v-row>
      <v-col>
        <h4 class="text-grey-darken-1">Topics</h4>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn to="/topics" variant="tonal" color="primary" prepend-icon="mdi-compass" class="discover-more-btn">
          Explore topics
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="(topic, index) in topics" :key="index" class="">
        <router-link :to="`topics/${topic.name.toLocaleLowerCase().replace(' ', '-')}`" class="w-100"
          style="color: black;">
          <v-card variant="outlined" class="pa-5 topic-card">
            <v-row>
              <v-col cols="2" class="d-flex align-center">
                <v-icon>{{ topic.icon }}</v-icon>
              </v-col>
              <v-col>
                <p>
                  <strong>{{ topic.name }}</strong>
                </p>
                <small>{{ topic.stories }} Stories · {{ topic.writers }} Writers</small>
              </v-col>
            </v-row>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts" setup>
const topics = [
  { name: "Web Development", icon: "mdi-semantic-web", stories: "279K", writers: "105K" },
  { name: "Society", icon: "mdi-transit-connection-variant", stories: "29K", writers: "15K" },
  { name: "Work", icon: "mdi-briefcase", stories: "350K", writers: "17K" },
  { name: "Lifestyle", icon: "mdi-all-inclusive", stories: "200K", writers: "78K" },
  { name: "Leadership", icon: "mdi-lead-pencil", stories: "268K", writers: "87K" },
  { name: "Gaming", icon: "mdi-controller", stories: "181K", writers: "64K" }
];
</script>

<style scoped>
.topics {
  margin-top: 15px;
  border-bottom: 0.5px solid #f5e5e5 !important;
  height: 300px;
  margin-bottom: 80px;
}

.topic-card {
  transition: .2s;
  border: 0.5px solid #f5e5e5;
}

.topic-card:hover {
  scale: 1.03;
  background: linear-gradient(90deg in hsl shorter hue, rgba(243, 243, 243, 0.432), rgb(238, 233, 233))
}

.discover-more-btn {
  width: 200px !important;
  text-transform: capitalize !important;
  /* text-align: center; */
}
</style>