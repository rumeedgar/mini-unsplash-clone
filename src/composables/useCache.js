import { reactive } from 'vue'

const cache = reactive({})

export function useCache() {
  const getCache = (key) => {
    const item = cache[key]
    if (item && item.expiry > Date.now()) {
      return item.value
    }
    return null
  }

  const setCache = (key, value, ttlMinutes) => {
    cache[key] = {
      value,
      expiry: Date.now() + ttlMinutes * 60 * 1000
    }
  }

  return { getCache, setCache }
}
