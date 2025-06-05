import { api } from '@/lib/axios';
import {create} from 'zustand';
import type { User } from '@/types/user';


type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  login: (email: string, password: string) => Promise<void>
  signup: (userData: User) => Promise<void>
  logout: () => void
  checkAuth: () => void

}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
   isAuthChecked: false,

  login: async (email,password) => {
    set({ loading: true, error: null })
    try {
      const res = await api.post('/auth/login', { email, password })
      const { accessToken, refreshToken, user } = res.data.data
console.log("Login response:", res.data)
console.log(user)
      set({ accessToken, refreshToken, user, isAuthenticated: true, loading: false })
    } catch (err) {
      console.error("Error logging in:", err)
      set({ user: null, isAuthenticated: false, isAuthChecked: true })
    }
  },

  signup: async (userData) => {
    set({ loading: true, error: null })
    try {
      const res = await api.post('/auth/signup', userData)
      const {  user } = res.data
console.log("Signup response:", res.data)
      set({  user, isAuthenticated: true, loading: false })
    } catch (err) {
      console.error("Error signing up:", err)
      set({ user: null, isAuthenticated: false, isAuthChecked: true })
    }
  },

  logout: async() => {
      try{
        await api.post("/auth/logout")
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false })

      }catch (err) {
      console.error("Error logging out:", err)
      set({ user: null, isAuthenticated: false, isAuthChecked: true })
    }
    
  },

  checkAuth: async () => {
   try {
      const res = await api.get('/auth/currentUser')
      const { data } = res.data
      set({ user: data, isAuthenticated: true, isAuthChecked: true })
    } catch (err) {
      console.error("Error checking auth:", err)
      set({ user: null, isAuthenticated: false, isAuthChecked: true })
    }
  }
}))