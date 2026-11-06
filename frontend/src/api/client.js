import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_URL ||
  (['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? '/api'
    : 'https://united-coffee.onrender.com/api')

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const tokens = {
  get access() { return localStorage.getItem('uc_access') },
  get refresh() { return localStorage.getItem('uc_refresh') },
  set({ access, refresh }) {
    if (access) localStorage.setItem('uc_access', access)
    if (refresh) localStorage.setItem('uc_refresh', refresh)
  },
  clear() {
    localStorage.removeItem('uc_access')
    localStorage.removeItem('uc_refresh')
  },
}

api.interceptors.request.use((config) => {
  const token = tokens.access
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshing = null

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const isAuthCall = /\/auth\/(login|register|refresh)\//.test(original?.url || '')
    if (error.response?.status === 401 && original && !original._retry && tokens.refresh && !isAuthCall) {
      original._retry = true
      try {
        refreshing = refreshing || axios
          .post(API_URL + '/auth/refresh/', { refresh: tokens.refresh })
          .finally(() => { refreshing = null })
        const { data } = await refreshing
        tokens.set(data)
        original.headers.Authorization = `Bearer ${data.access}`
        return api(original)
      } catch {
        tokens.clear()
        window.dispatchEvent(new Event('uc-logout'))
      }
    }
    return Promise.reject(error)
  }
)

export function apiError(err, fallback = 'Something went wrong. Please try again.') {
  const d = err?.response?.data
  if (!err?.response) return 'Cannot reach the server. Is the backend running?'
  if (!d || typeof d === 'string') return fallback
  if (d.detail) return String(d.detail)
  const first = Object.values(d)[0]
  const msg = Array.isArray(first) ? first[0] : first
  return typeof msg === 'string' ? msg : fallback
}

export default api