import router from '@/router'
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_URL
  // You can add your headers here
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  // headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use((config) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem('access_token')
  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    // Handle error
    if (error.response.status === 401) {
      console.log('masuk')
      // ℹ️ Logout user and redirect to login page
      // Remove "userData" from localStorage
      localStorage.removeItem('user')

      // Remove "accessToken" from localStorage
      localStorage.removeItem('access_token')
      // localStorage.removeItem('userAbilities')

      // If 401 response returned from api
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export default axiosIns
