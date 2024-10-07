import { ref, onMounted } from 'vue'
import axiosInstance from '@/utils/axios'
import { useCache } from '@/composables/useCache'
import debounce from 'lodash/debounce'

export function usePhotoSearch() {
  const photoList = ref([])
  const searchInput = ref('')
  const searchQuery = ref('')
  const loading = ref(false)
  const showSearchResults = ref(false)
  const page = ref(1)
  const hasMore = ref(true)

  const { getCache, setCache } = useCache()

  onMounted(() => {
    prefetchCommonSearches()
  })

  const debouncedSearch = debounce(() => {
    if (searchInput.value.trim()) {
      searchQuery.value = searchInput.value
      page.value = 1
      searchPhotos()
    }
  }, 300)

  const getLatestAfricanPhotos = async () => {
    loading.value = true
    const cacheKey = 'latest_african_photos'
    const cachedData = getCache(cacheKey)

    if (cachedData) {
      photoList.value = cachedData
      loading.value = false
      return
    }

    try {
      const { data } = await axiosInstance.get('search/photos', {
        params: { query: 'africa', per_page: 8, order_by: 'latest' }
      })
      photoList.value = data.results
      setCache(cacheKey, data.results, 60 * 5) // Cache for 5 minutes
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
    const cacheKey = `search_${searchQuery.value}_${page.value}`
    const cachedData = getCache(cacheKey)

    if (cachedData) {
      updatePhotoList(cachedData)
      loading.value = false
      return
    }

    try {
      const { data } = await axiosInstance.get('search/photos', {
        params: {
          query: `${searchQuery.value} africa`,
          per_page: 8,
          page: page.value
        }
      })
      updatePhotoList(data.results)
      setCache(cacheKey, data.results, 60 * 5) // Cache for 5 minutes
      hasMore.value = data.total_pages > page.value
    } catch (error) {
      console.error('Error fetching photos:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      loading.value = false
    }
  }

  const updatePhotoList = (newPhotos) => {
    if (page.value === 1) {
      photoList.value = newPhotos
    } else {
      photoList.value = [...photoList.value, ...newPhotos]
    }
    showSearchResults.value = true
  }

  const loadMore = () => {
    if (!loading.value && hasMore.value) {
      page.value++
      searchPhotos()
    }
  }

  const prefetchCommonSearches = async () => {
    const commonSearches = ['wildlife', 'landscape', 'food', 'children', 'culture']
    commonSearches.forEach(async (search) => {
      const cacheKey = `search_${search}_1`
      if (!getCache(cacheKey)) {
        try {
          const { data } = await axiosInstance.get('search/photos', {
            params: { query: `${search} africa`, per_page: 8, page: 1 }
          })
          setCache(cacheKey, data.results, 60 * 30) // Cache for 30 minutes
        } catch (error) {
          console.error(`Error prefetching ${search}:`, error)
        }
      }
    })
  }

  const handleSearch = () => {
    if (searchInput.value.trim()) {
      searchQuery.value = searchInput.value
      page.value = 1
      searchPhotos()
    }
  }

  return {
    photoList,
    searchInput,
    searchQuery,
    loading,
    showSearchResults,
    hasMore,
    getLatestAfricanPhotos,
    searchPhotos,
    loadMore,
    handleSearch,
    debouncedSearch
  }
}
