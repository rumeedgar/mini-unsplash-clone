<template>
  <div class="home">
    <header class="header">
      <template v-if="searchQuery">
        <button class="back-button" @click="resetSearch">Go back</button>
        <h1 class="header-search-title">
          Search Results for &quot;<span class="search-query">{{ searchQuery }}</span
          >&quot;
        </h1>
      </template>

      <form class="header-search" @submit.prevent="searchPhotos" v-else>
        <img class="header-icon" src="@/assets/search-icon.svg" />
        <input v-model="searchQuery" class="header-input" placeholder="Search for photo" />
      </form>
    </header>

    <main class="main-content">
      <div class="photo-list">
        <template v-if="photoList.length">
          <div
            v-for="(photo, index) in photoList"
            :key="index"
            class="photo-list-item"
            @click.prevent="previewPhoto(photo)"
            :style="backgroundStyle(photo.urls.regular)"
          >
            <div class="photo-overlay">
              <div class="photo-info">
                <div>{{ photo.user.name }}</div>
                <small>{{ photo.user.location }}</small>
              </div>
            </div>
          </div>
        </template>

        <!-- Placeholder loading items -->
        <template v-else>
          <div v-for="index in 6" :key="index" class="photo-list-item">
            <div class="photo-placeholder">
              <div class="photo-info">
                <div class="photo-placeholder-text photo-info-title"></div>
                <div class="photo-placeholder-text photo-info-subtitle"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>

    <!-- Image modal component -->
    <ImagePreview v-if="showPreview" @close="closePreview" :preview="preview" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import ImagePreview from '@/components/ImagePreview.vue'
import { useDebounceFn } from '@vueuse/core' // Import debounce function

const photoList = ref([]) // For storing the photos (either default or search)
const searchQuery = ref('') // Start with an empty search query
const showPreview = ref(false) // Preview modal state
const preview = ref({}) // Preview data
const debouncedSearch = useDebounceFn(() => searchPhotos(), 500) // Debounce searchPhotos function

// Function to fetch the latest African photos
const getLatestAfricanPhotos = async () => {
  const params = { query: 'africa', per_page: 8, order_by: 'latest' }
  try {
    const { data } = await axios.get('https://api.unsplash.com/search/photos', {
      params,
      headers: {
        Authorization: `Client-ID Mx3V9s3sOQLwOVKZoFOAEo3pt50XlwvqLmABR1to__8` // Hardcoded access key
      }
    })
    photoList.value = data.results // Store the results in the photoList
  } catch (error) {
    console.error('Error fetching latest African photos:', error)
  }
}

// Function to fetch photos based on user search
const searchPhotos = async () => {
  if (!searchQuery.value) return // Avoid making a request for an empty search
  const params = { query: `${searchQuery.value} africa`, per_page: 8 }
  try {
    const { data } = await axios.get('https://api.unsplash.com/search/photos', {
      params,
      headers: {
        Authorization: `Client-ID Mx3V9s3sOQLwOVKZoFOAEo3pt50XlwvqLmABR1to__8` // Hardcoded access key
      }
    })
    photoList.value = data.results // Store search results in the photoList
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
}

// Watch the searchQuery and call the debounced search function
watch(searchQuery, () => {
  debouncedSearch()
})

// Function to get background style for the photo list item
const backgroundStyle = (url) => {
  return {
    backgroundImage: `url(${url})`
  }
}

// Handle image preview
const previewPhoto = (photo) => {
  preview.value = photo
  showPreview.value = true
}

// Close preview modal
const closePreview = () => {
  showPreview.value = false
}

// Reset search and reload default African photos
const resetSearch = () => {
  searchQuery.value = ''
  getLatestAfricanPhotos() // Reload latest African photos
}

// Fetch latest African photos on component mount
onMounted(() => {
  getLatestAfricanPhotos()
})
</script>

<style scoped lang="scss">
.home {
  .header {
    padding: 90px 9%;
    background-color: #dce2e9;

    .back-button {
      border: none;
      padding: 0;
      outline: none;
      background: none;
      font-size: 16px;
      color: var(--secondary-color);
    }

    .header-search-title {
      color: var(--primary-color);
      font-size: 40px;
    }

    .search-query {
      color: var(--secondary-color);
      text-transform: capitalize;
    }

    &-search {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 26px;
      border-radius: 8px;
      background-color: #ffffff;
      box-shadow: 0 15px 30px rgba(0, 0, 0.1, 0.08);

      .header-icon {
        margin-right: 20px;
      }

      .header-input {
        padding: 0;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 18px;

        &:focus {
          outline: none;
          border: none;
        }

        &::placeholder {
          color: var(--primary-color);
        }
      }
    }
  }

  .main-content {
    padding: 0 12%;
    margin-top: -40px;
    margin-bottom: 60px;

    .photo-list {
      display: grid;
      grid-row-gap: 40px;
      grid-auto-rows: 20px;
      grid-column-gap: 60px;
      justify-items: center;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

      .photo-list-item {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &:nth-child(n) {
          grid-row-end: span 8;
        }

        &:nth-child(1) {
          grid-row-end: span 6;
        }

        &:nth-child(2) {
          grid-row-end: span 8;
        }

        &:nth-child(3) {
          grid-row-end: span 7;
        }
      }

      @media only screen and (min-width: 998px) {
        .images {
          grid-template-columns: repeat(3, minmax(300px, 1fr));
        }
      }

      .photo-overlay,
      .photo-placeholder {
        height: 100%;
        display: flex;
        border-radius: 8px;
        flex-direction: column;
        justify-content: flex-end;

        .photo-info {
          color: #ffffff;
          padding: 20px;
        }
      }

      .photo-overlay {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.2);
      }

      .photo-placeholder {
        background-color: #f5f5f5;

        @keyframes placeHolderShimmer {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }

        &-text {
          height: 15px;
          margin-bottom: 8px;
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: placeHolderShimmer;
          animation-timing-function: linear;
          background: #e6e6e6 linear-gradient(to right, #efefef 8%, #dfdfdf 18%, #efefef 33%);
          background-size: 800px 104px;
        }

        .photo-info-title {
          width: 180px;
        }

        .photo-info-subtitle {
          width: 100px;
        }
      }
    }
  }
}
</style>
