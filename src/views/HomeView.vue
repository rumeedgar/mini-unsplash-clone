<template>
  <div class="home">
    <AppHeader
      :show-search-results="showSearchResults"
      :search-query="searchQuery"
      :search-input="searchInput"
      @reset-search="resetSearch"
      @search="handleSearch"
      @update:searchInput="searchInput = $event"
    />
    <main class="main-content">
      <PhotoList :photos="photoList" :loading="loading" @preview="previewPhoto" />
    </main>
    <ImagePreview v-if="showPreview" :preview="preview" @close="closePreview" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePhotoSearch } from '@/composables/usePhotoSearch'
import AppHeader from '@/components/AppHeader.vue'
import PhotoList from '@/components/PhotoList.vue'
import ImagePreview from '@/components/ImagePreview.vue'

const {
  photoList,
  searchInput,
  searchQuery,
  showSearchResults,
  loading,
  getLatestAfricanPhotos,
  searchPhotos,
  handleSearch: composableHandleSearch,
  // debouncedSearch,
  resetSearch: composableResetSearch
} = usePhotoSearch()

const showPreview = ref(false)
const preview = ref({})

const handleSearch = () => {
  composableHandleSearch()
}

const previewPhoto = (photo) => {
  preview.value = photo
  showPreview.value = true
}

const closePreview = () => {
  showPreview.value = false
}

const resetSearch = () => {
  composableResetSearch()
}

onMounted(getLatestAfricanPhotos)
</script>

<style scoped lang="scss">
.home {
  // Home-specific styles
}

.main-content {
  padding: 0 12%;
  margin-top: -40px;
  margin-bottom: 60px;
}
</style>
