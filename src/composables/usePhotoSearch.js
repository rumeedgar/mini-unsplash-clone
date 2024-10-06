import { ref } from 'vue'
import axiosInstance from '@/utils/axios'

export function usePhotoSearch() {
  const photoList = ref([])
  const searchInput = ref('')
  const searchQuery = ref('')
  const loading = ref(false)
  const showSearchResults = ref(false)

  const getLatestAfricanPhotos = async () => {
    loading.value = true
    try {
      const { data } = await axiosInstance.get('search/photos', {
        params: { query: 'africa', per_page: 8, order_by: 'latest' }
      })
      photoList.value = data.results
    } catch (error) {
      console.error('Error fetching latest African photos:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      loading.value = false
    }
  }

  const searchPhotos = async () => {
    if (!searchQuery.value) return
    loading.value = true
    try {
      const { data } = await axiosInstance.get('search/photos', {
        params: { query: `${searchQuery.value} africa`, per_page: 8 }
      })
      photoList.value = data.results
      showSearchResults.value = true
    } catch (error) {
      console.error('Error fetching photos:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      loading.value = false
    }
  }

  return {
    photoList,
    searchInput,
    searchQuery,
    loading,
    showSearchResults,
    getLatestAfricanPhotos,
    searchPhotos
  }
}
