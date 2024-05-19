<template>
  <section class="globe">
    <v-row>
      <v-col>
        <h4 class="text-grey-darken-1">Real-Time updates</h4>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn to="/topics" variant="tonal" color="primary" prepend-icon="mdi-compass" class="discover-more-btn">
          See more
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center mt-0">
      <v-col cols="6" class="d-flex align-center">
        <v-row>
          <v-col cols="12">
            <h1 class="realtime-h1">
              <em>“Experience Real-Time Stories from Across the Globe”</em>
            </h1>
          </v-col>
          <v-col cols="12">
            <p class="realtime-body">
              Stay connected with our platform and immerse yourself in a world of real-time updates.
              Explore captivating stories, breaking news, and insightful articles as they unfold,
              providing you with a dynamic and ever-evolving reading experience. Dive into the pulse
              of the world with our real-time updates, keeping you informed and engaged with the
              latest happenings across various topics and regions.
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" style="position: relative">
        <div ref="container" class="globe-container"></div>
        <div class="text-center w-100" style="margin-top: -55px;">
          <strong>
            <small style="color: gray;">
              <em>
                Hover over the country to see details of the trending story.
              </em>
            </small>
          </strong>
        </div>
        <div ref="hoverCard" class="hover-card" v-if="initialStory">
          <!-- author image -->
          <div class="author">
            <v-img class="author-image-img" :src="initialStory.author.profileImageUrl" />
            <div class="detials">
              <strong class="author-name">
                {{ initialStory.author.name }}
              </strong>
              <div class="date-follow">
                <small class="story-date">{{ initialStory.date }}</small>
              </div>
            </div>
          </div>

          <!-- story details -->
          <div class="story">
            <strong class="story-title">{{ initialStory.title }}</strong>
            <v-img class="story-img-cover" :src="initialStory.coverURL" />
            <small class="story-description">
              <em>
                {{ initialStory.description }}
              </em>
            </small>
          </div>

          <!-- countries details -->
          <div class="countries-details">
            <small class="countries-details-published">
              <li>
                <em>
                  This story is posted from
                  <span class="strong text-primary">
                    {{ initialStory.countryDetails?.published.name }}
                  </span>
                  and now it's a trend in
                  <span class="strong text-primary">
                    {{ initialStory.countryDetails?.received.name }}
                  </span>
                </em>
              </li>
            </small>
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import * as THREE from 'three'
import { onMounted, ref, defineComponent } from 'vue'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { CountryDetailsType, StoryDetails } from '@/utils/types';

export default defineComponent({
  setup() {
    const container = ref<HTMLElement | null>(null)
    const hoverCard = ref<HTMLElement | null>(null)
    const EARTH_RADIUS = 3
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const countries: CountryDetailsType[] = [
      { name: 'London', lat: 51.5074, lon: -0.1278 },
      { name: 'New York', lat: 40.7128, lon: -74.006 },
      { name: 'Egypt', lat: 26.8206, lon: 30.8025 },
      { name: 'Canada', lat: 56.1304, lon: -106.3468 },
      { name: 'UAE', lat: 25.276987, lon: 55.296249 },
      { name: 'Switzerland', lat: 46.8182, lon: 8.2275 }
    ]

    // const hoverCountry = ref<CountryDetailsType | null>({ lat: countries[0].lat, lon: countries[1].lon, name: countries[0].name });
    const initialStory = ref<StoryDetails | null>(null)
    // const hoverCountry = ref<CountryDetailsType | null>(null)

    let lines: THREE.Line[] = []
    let marks: THREE.Mesh[] = []

    onMounted(() => {
      if (container.value) {
        // Camera setup
        const camera = new THREE.PerspectiveCamera(20, 750 / 550, 0.1, 1000)
        camera.position.set(10, 5, 20)

        // Scene setup
        const scene = new THREE.Scene()

        // Renderer setup
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(750, 550)
        renderer.setClearColor(0xffffff, 0)
        container.value.appendChild(renderer.domElement)

        // Controls setup
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = false
        controls.enablePan = false
        controls.enableZoom = false
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;

        // Globe setup
        const globeGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 55, 55)
        const globeTexture = new THREE.TextureLoader().load('/public/images/earth_texture.jpg')
        const globeMaterial = new THREE.MeshBasicMaterial({ map: globeTexture })
        const globe = new THREE.Mesh(globeGeometry, globeMaterial)
        scene.add(globe)

        const pairs: [CountryDetailsType, CountryDetailsType][] = [
          [countries[0], countries[1]], // London to New York
          [countries[1], countries[2]], // New York to Egypt
          [countries[2], countries[3]], // Egypt to Canada
          [countries[3], countries[4]], // Canada to UAE
          [countries[4], countries[5]], // UAE to Switzerland
          [countries[5], countries[0]] // Switzerland to London
        ]

        // Function to convert geographical coordinates to 3D coordinates
        // eslint-disable-next-line no-inner-declarations
        function convertTo3D(lat: number, lon: number, radius: number) {
          const phi = THREE.MathUtils.degToRad(90 - lat)
          const theta = THREE.MathUtils.degToRad(lon)
          const x = radius * Math.sin(phi) * Math.cos(theta)
          const y = radius * Math.cos(phi)
          const z = radius * Math.sin(phi) * Math.sin(theta)
          return new THREE.Vector3(x, y, z)
        }

        // eslint-disable-next-line no-inner-declarations
        function createMarks(country: CountryDetailsType) {
          const markGeometry = new THREE.SphereGeometry(0.1, 10, 10)
          const markMaterial = new THREE.MeshBasicMaterial({ color: 0x11559008 })
          const markPosition = convertTo3D(country.lat, country.lon, EARTH_RADIUS)
          const mark = new THREE.Mesh(markGeometry, markMaterial)

          mark.position.set(markPosition.x, markPosition.y, markPosition.z)
          mark.userData = country // Store country data in userData

          // mark.addEventListener('click', () => handleClick(country));
          scene.add(mark)
          marks.push(mark) // Add mark to marks array for raycasting
          return mark
        }

        // eslint-disable-next-line no-inner-declarations
        function createCurves() {
          pairs.forEach((pair, index) => {
            setTimeout(() => {
              const startCountry = pair[0]
              const endCountry = pair[1]
              const start = convertTo3D(startCountry.lat, startCountry.lon, EARTH_RADIUS)
              const end = convertTo3D(endCountry.lat, endCountry.lon, EARTH_RADIUS)

              createMarks(startCountry)
              createMarks(endCountry)

              // Midpoint for curve
              const midLat = (startCountry.lat + endCountry.lat) / 2
              const midLon = (startCountry.lon + endCountry.lon) / 2
              const mid = convertTo3D(midLat, midLon, EARTH_RADIUS + 1) // Adjust height for curve

              const curve = new THREE.CatmullRomCurve3([start, mid, end])
              const points = curve.getPoints(50) // Increase for smoother curve
              const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

              const lineMaterial = new THREE.LineBasicMaterial({ color: 0x11559008 })
              const line = new THREE.Line(lineGeometry, lineMaterial)

              if (lines[index]) {
                scene.remove(lines[index])
              }

              if (marks[index]) {
                scene.remove(marks[index])
              }

              lines[index] = line
              scene.add(line)
            }, index * 1000)
          })
        }

        // eslint-disable-next-line no-inner-declarations
        function removeCurvesAndMarks() {
          lines.forEach((line, index) => {
            setTimeout(() => {
              if (line) {
                scene.remove(line)
              }
              if (marks[index]) {
                scene.remove(marks[index])
              }
              if (marks[index + 1]) {
                scene.remove(marks[index + 1])
              }
            }, index * 1000)
          })
          lines = []
          marks = []
        }

        createCurves()
        setInterval(() => {
          removeCurvesAndMarks()
          setTimeout(createCurves, pairs.length * 1000)
        }, pairs.length * 3000)

        // Animate the scene
        // eslint-disable-next-line no-inner-declarations
        function animate() {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }

        // Define handleClick function to handle click event
        // eslint-disable-next-line no-inner-declarations
        // function handleClick(country: CountryDetailsType) {
        //   // Perform desired actions when a mark is clicked
        //   console.log('Clicked on:', country.name);
        // }

        animate()

        // Mouse move event listener for raycasting
        // eslint-disable-next-line no-inner-declarations
        function onMouseMove(event: MouseEvent) {
          const rect = renderer.domElement.getBoundingClientRect()
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
          raycaster.setFromCamera(mouse, camera)

          let intersects = raycaster.intersectObjects(marks);
          if (intersects.length > 0) {
            const intersected = intersects[0].object
            const country = intersected.userData as CountryDetailsType
            // We need to handle the API here.
            initialStory.value = {
              id: 1502,
              title: "Programming Principles They Don’t Teach You In School",
              description: "Introduction to important principles you should know — DRY, KISS, SOLID",
              date: "Mar 3, 2023",
              coverURL: "/public/images/stories/story1.png",

              countryDetails: {
                published: country,
                received: countries[2]
              },
              author: {
                id: 105,
                name: "Nishant Aanjaney Jalan",
                profileImageUrl: "/public/images/users/user5.png",
              },
            }
            // hoverCountry.value = country

            if (hoverCard.value) {
              hoverCard.value.style.display = 'block'
            }
          } else {
            if (hoverCard.value) {
              hoverCard.value.style.display = 'none'
              intersects = []
            }
          }
        }

        // // Mouse click event listener for marks
        // // eslint-disable-next-line no-inner-declarations
        // function onMouseClick(event: MouseEvent) {
        //   const rect = renderer.domElement.getBoundingClientRect()
        //   mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        //   mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        //   raycaster.setFromCamera(mouse, camera)

        //   const intersects = raycaster.intersectObjects(marks);
        //   if (intersects.length > 0) {
        //     const intersected = intersects[0].object;
        //     const country = intersected.userData as CountryDetailsType
        //     hoverCountry.value = country

        //     if (hoverCountry.value) {
        //       // Handle this later...
        //       handleClick(country);
        //     }
        //   }
        // }

        container.value.addEventListener('mousemove', onMouseMove)
        // container.value.addEventListener('click', onMouseClick);

      }
    })

    return {
      container,
      hoverCard,
      initialStory
    }
  }
})
</script>

<style scoped>
.globe {
  margin-top: 15px;
  margin-bottom: 80px;
  border-bottom: 0.5px solid #f5e5e5 !important;
  height: 650px;
}

.globe-container {
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.realtime-h1 {
  font-weight: 800;
  font-size: 40px;
  font-family: sans-serif;
  line-height: 1.2;
  padding-bottom: 15px;
  width: 100%;
}

.realtime-body {
  font-size: 16px;
  text-align: justify;
  font-weight: 700;
  color: #000000;
  font-family: system-ui;
  background: #bfc3d526;
  padding: 17px;
  line-break: anywhere;
  text-align: start;
  border-left: 5px solid #222a50;
  border-radius: 7px;
  box-shadow: 0px 3px 11px -8px #222a50;
}

.discover-more-btn {
  width: 200px !important;
}

.hover-card {
  position: absolute;
  /* display: none; */
  background: white;
  border: 1px solid white;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgb(197 98 98 / 30%);
  color: white;
  pointer-events: none;
  z-index: 10;
  top: 10%;
  right: 5%;
  width: 300px;
}

.author {
  padding: 5px;
  display: flex;
  margin-bottom: 15px;
}

.author-image-img {
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(183, 180, 180, 0.476);
  padding: 15px;
  width: 50px !important;
  height: 50px !important;
  display: block;
  flex: none;
}

.author-name {
  display: flex;
  align-items: center;
  margin-left: 15px;
}

.story-date {
  margin-left: 15px;
  margin-top: -3px !important;
  display: block;
  color: #8a8989;
  /* float: right; */
}

.story {
  padding: 10px;
  box-shadow: 0 2px 5px rgba(183, 180, 180, 0.622);
  text-align: center;
  border-left: 1px solid #222a50;
  background: #8887870f;
}

.story-title,
.story-description,
.countries-details-published,
.author-name {
  color: #000000;
}

.countries-details {
  margin-top: 15px;
}

.story-img-cover {
  width: 250px;
  height: 150px;
  margin: 0 auto;
  padding: 5px;
  border-radius: 6px;
}
</style>