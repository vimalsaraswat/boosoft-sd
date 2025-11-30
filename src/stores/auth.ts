import { defineStore } from 'pinia'

export interface AuthState {
  token: string | null
  email: string | null
}

const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('auth_token'),
    email: localStorage.getItem('auth_email'),
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },

  actions: {
    setAuth(token: string, email?: string) {
      this.token = token
      localStorage.setItem('auth_token', token)
      if (email) {
        this.email = email
        localStorage.setItem('auth_email', email)
      }
    },

    setEmail(email: string) {
      this.email = email
      localStorage.setItem('auth_email', email)
    },

    clearAuth() {
      this.token = null
      this.email = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')
    },
  },
})

export default useAuthStore
