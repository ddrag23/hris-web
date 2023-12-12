import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { ElNotification } from 'element-plus'
import type { AuthRequest } from '@/views/auth/dtos/auth.dto'
export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)
  const userLogin = computed(() => {
    return localStorage.getItem('user') != null
      ? JSON.parse(localStorage.getItem('user') as string)
      : ''
  })
  async function login(credential: AuthRequest) {
    try {
      const response = await axios.post('/auth/login', credential)
      console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('access_token', response.data.access_token)
      isLogin.value = true
    } catch (error: any) {
      console.error(error)
      ElNotification({
        title: 'Gagal',
        message: error.response.status == 401 ? 'Username atau password salah' : 'Login gagal',
        type: 'error'
      })
    }
  }

  return { login, isLogin, userLogin }
})
