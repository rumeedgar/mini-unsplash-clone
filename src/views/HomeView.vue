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
    <main class="main-content">
      <PhotoList
        :photos="photoList"
        :loading="loading"
        :has-more="hasMore"
        @preview="previewPhoto"
        @load-more="loadMore"
      />
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
