<template>
  <div class="home">
    <AppHeader
      :show-search-results="showSearchResults"
      :search-query="searchQuery"
      :search-input="searchInput"
      @reset-search="resetSearch"
      @search="handleSearch"
      @update:searchInput="updateSearchInput"
    />
    <main class="main-content" ref="mainContent">
      <PhotoList :photos="photoList" :loading="loading" @preview="previewPhoto" />
    </main>
    <ImagePreview v-if="showPreview" :preview="preview" @close="closePreview" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePhotoSearch } from '@/composables/usePhotoSearch'
import AppHeader from '@/components/AppHeader.vue'
import PhotoList from '@/components/PhotoList.vue'
import ImagePreview from '@/components/ImagePreview.vue'

const {
  photoList,
  searchInput,
  searchQuery,
  loading,
  showSearchResults,
  hasMore,
  getLatestAfricanPhotos,
  handleSearch,
  loadMore,
  resetSearch
} = usePhotoSearch()

const showPreview = ref(false)
const preview = ref({})
const mainContent = ref(null)

const previewPhoto = (photo) => {
  preview.value = photo
  showPreview.value = true
}

const closePreview = () => {
  showPreview.value = false
}

const updateSearchInput = (value) => {
  searchInput.value = value
}

const handleScroll = () => {
  if (mainContent.value) {
    const { scrollTop, scrollHeight, clientHeight } = mainContent.value
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading.value && hasMore.value) {
      loadMore()
    }
  }
}

onMounted(() => {
  getLatestAfricanPhotos()
  mainContent.value.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (mainContent.value) {
    mainContent.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped lang="scss">
.home {
}

.main-content {
  padding: 0 12%;
  margin-top: -40px;
  margin-bottom: 60px;
}
</style>
