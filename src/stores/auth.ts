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
      const {
        data: {
          data: { access_token, user }
        }
      } = await axios.post('/auth/login', credential)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('access_token', access_token)
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
