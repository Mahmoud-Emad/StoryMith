<template>
  <loading-section-componentfrom
    :is-loading="loadingStories"
    :loading-message="loadingMessage"
    :is-stories="true"
    v-if="loadingStories"
  />

  <section class="home-sections stories" v-else>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col>
            <h4 class="text-grey-darken-1">Various narratives</h4>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              to="/topics"
              variant="tonal"
              color="primary"
              prepend-icon="mdi-compass"
              class="discover-more-btn"
            >
              Discover stories
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row class="d-flex justify-center mt-0">
          <v-col cols="3" v-for="(story, index) in stories" :key="index">
            <router-link :to="`stories/${story.id}`" class="w-100" style="color: black">
              <div class="book">
                <div class="book-cover" :style="{ backgroundImage: `url(${story.coverURL})` }">
                  <div class="overlay"></div>
                  <div
                    class="title"
                    :style="{
                      backgroundColor: titleBackgroundColors[index],
                      color: titleTextColors[index]
                    }"
                  >
                    <strong>{{ story.title }}</strong>
                  </div>
                  <div class="description">
                    <small>{{
                      story.description.length > 35
                        ? story.description.slice(0, 35) + '...'
                        : story.description
                    }}</small>
                  </div>
                  <div class="author">
                    <v-img class="author-img" :src="story.author.profileImageUrl" />
                  </div>
                  <div class="author-name">
                    <small>{{ story.author.name }}</small>
                  </div>
                  <div class="light"></div>
                </div>
                <div class="book-inside"></div>
              </div>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import type { StoryDetails } from '@/utils/types'
import { onMounted, ref, reactive, defineComponent } from 'vue'
import LoadingSectionComponentfrom from '@/components/ui/LoadingSectionComponent.vue'

export default defineComponent({
  components: {
    LoadingSectionComponentfrom
  },
  setup() {
    const loadingStories = ref(false)
    const loadingMessage = ref('Loading stories')

    const titleBackgroundColors = ref<string[]>([])
    const titleTextColors = ref<string[]>([])
    const stories = reactive<StoryDetails[]>([])

    onMounted(() => {
      loadingStories.value = true
      const _stories = getStories()
      stories.push(..._stories)
      stories.forEach((story) => {
        processCoverImage(story.coverURL!)
      })

      setTimeout(() => {
        // TODO: Remove the timeout after intgrating with the backend.
        loadingStories.value = false
        loadingMessage.value = ''
      }, 1000)
    })

    function getStories() {
      return [
        {
          id: 1,
          title: 'Stop Using localStorage!',
          coverURL: '/public/images/books/cover_1.png',
          author: {
            id: 1,
            name: 'Julien Etienne',
            profileImageUrl: '/public/images/users/user3.png'
          },
          description:
            'The title is not clickbait, the message is abrupt “Stop Using localStorage!',
          date: 'Dec 22, 2023'
        },
        {
          id: 2,
          title: 'Reactive DOM — Finally',
          coverURL: '/public/images/books/cover_2.png',
          author: {
            id: 1,
            name: 'Elson',
            profileImageUrl: '/public/images/users/user2.png'
          },
          description:
            'DOM API should not be the reason to avoid building with Vanilla JavaScript.',
          date: 'Apr 21, 2024'
        },
        {
          id: 3,
          title: 'It’s Okay to Be A Loser',
          coverURL: '/public/images/books/cover_3.png',
          author: {
            id: 1,
            name: 'Godfrey The Great',
            profileImageUrl: '/public/images/users/user1.png'
          },
          description: 'Most people today can’t shut up.',
          date: 'Nov 16, 2023'
        },
        {
          id: 4,
          title: 'The Age Paradox',
          coverURL: '/public/images/books/cover_4.png',
          author: {
            id: 4,
            name: 'chel writes',
            profileImageUrl: '/public/images/users/user4.png'
          },
          description: 'An internal perception and external response',
          date: 'Jan 4, 2024'
        }
      ]
    }

    function processCoverImage(coverUrl: string) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const img = new Image()

      img.crossOrigin = 'Anonymous'
      img.src = coverUrl

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        if (context) {
          context.drawImage(img, 0, 0)

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
          const pixelArray = imageData.data

          let totalRed = 0
          let totalGreen = 0
          let totalBlue = 0

          for (let i = 0; i < pixelArray.length; i += 4) {
            totalRed += pixelArray[i]
            totalGreen += pixelArray[i + 1]
            totalBlue += pixelArray[i + 2]
          }

          const averageRed = totalRed / (pixelArray.length / 4)
          const averageGreen = totalGreen / (pixelArray.length / 4)
          const averageBlue = totalBlue / (pixelArray.length / 4)

          // Calculate luminance
          const luminance = (0.299 * averageRed + 0.587 * averageGreen + 0.114 * averageBlue) / 255

          // Set title text color based on luminance
          const textColor = luminance > 0.5 ? 'black' : 'white'

          titleBackgroundColors.value.push(`rgb(${averageRed},${averageGreen},${averageBlue})`)
          titleTextColors.value.push(textColor)
        }
      }
    }

    return {
      loadingStories,
      loadingMessage,
      stories,
      titleBackgroundColors,
      titleTextColors
    }
  }
})
</script>

<style scoped>
.stories {
  height: 480px;
}

.book {
  width: 225px;
  height: 350px;
  position: relative;
  text-align: center;
  margin: 2.5%;
}

.book-cover {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  transform-origin: 0 50%;
  -webkit-transform-origin: 0 50%;
  background-size: cover;
  border-radius: 3px;
  box-shadow:
    inset 4px 1px 3px #ffffff60,
    inset 0 -1px 2px #00000080;
  transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
}

.book .book-cover .overlay {
  background: #cbcbcb69;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
}

.book .book-cover .title {
  width: 100%;
  position: absolute;
  top: 0%;
  font-size: 15px;
  font-weight: 700;
  font-family: sans-serif;
  text-align: start;
  padding: 15px;
}

.book .book-cover .description {
  width: 100%;
  position: absolute;
  bottom: 15%;
  font-size: 19px;
  text-align: left;
  padding: 10px;
  font-weight: 600;
  font-family: sans-serif;
  background: #f0ffff70;
  border-radius: 2px;
}

.book .book-cover .author {
  position: absolute;
  bottom: 3%;
  width: 100%;
}

.book .book-cover .author-name {
  position: absolute;
  font-size: 17px;
  font-family: sans-serif;
  font-weight: 600;
  bottom: 5%;
  left: 22%;
}

.book .book-cover .author .author-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
}

.book .book-cover {
  background-size: cover;
}

.book-cover::before {
  width: 22px;
  height: 100%;
  border-left: 2px solid #00000010;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: all 0.5s ease;
  content: '';
  display: block;
  margin-left: -22px;
  background: #0000000f;
}

.light {
  width: 90%;
  height: 100%;
  position: absolute;
  border-radius: 3px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
  top: 0;
  right: 0;
  opacity: 0.1;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
}

.book:hover {
  cursor: pointer;
}

.book:hover .book-cover {
  transform: perspective(2000px) rotateY(-30deg);
  -webkit-transform: perspective(2000px) rotateY(-30deg);
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  box-shadow:
    inset 4px 1px 3px #ffffff60,
    inset 0 -1px 2px #00000080,
    10px 0px 10px -5px #00000030;
}

.book:hover .light {
  opacity: 1;
  width: 70%;
}

.book-inside {
  width: calc(100% - 2px);
  height: 96%;
  position: relative;
  top: 2%;
  border: 1px solid grey;
  border-radius: 3px;
  background: white;
  box-shadow:
    10px 40px 40px -10px #00000030,
    inset -2px 0 0 grey,
    inset -3px 0 0 #dbdbdb,
    inset -4px 0 0 white,
    inset -5px 0 0 #dbdbdb,
    inset -6px 0 0 white,
    inset -7px 0 0 #dbdbdb,
    inset -8px 0 0 white,
    inset -9px 0 0 #dbdbdb;
}

.discover-more-btn {
  width: 200px !important;
  text-transform: capitalize !important;
  /* text-align: center; */
}
</style>
