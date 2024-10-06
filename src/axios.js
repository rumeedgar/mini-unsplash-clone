import axios from 'axios'

console.log('Unsplash Access Key:', import.meta.env.VITE_UNSPLASH_ACCESS_KEY)

const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID Mx3V9s3sOQLwOVKZoFOAEo3pt50XlwvqLmABR1to__8'
  }
})

export default axiosInstance
