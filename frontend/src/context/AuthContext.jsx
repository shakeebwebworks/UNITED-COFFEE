import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api, { apiError, tokens } from '../api/client.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(tokens.access || tokens.refresh))

  useEffect(() => {
    let alive = true
    if (tokens.access || tokens.refresh) {
      api.get('/auth/me/')
        .then(({ data }) => { if (alive) setUser(data) })
        .catch((err) => { if (err.response?.status === 401) tokens.clear() })
        .finally(() => { if (alive) setLoading(false) })
    }
    const onLogout = () => setUser(null)
    window.addEventListener('uc-logout', onLogout)
    return () => {
      alive = false
      window.removeEventListener('uc-logout', onLogout)
    }
  }, [])

  const value = useMemo(() => {
    const register = async ({ name, email, phone, password }) => {
      try {
        const { data } = await api.post('/auth/register/', {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          password,
        })
        tokens.set(data)
        setUser(data.user)
        return data.user
      } catch (err) {
        throw new Error(apiError(err, 'Could not create your account.'))
      }
    }

    const login = async (email, password) => {
      try {
        const { data } = await api.post('/auth/login/', { email: email.trim().toLowerCase(), password })
        tokens.set(data)
        const me = await api.get('/auth/me/')
        setUser(me.data)
        return me.data
      } catch (err) {
        if (err.response?.status === 401) throw new Error('Incorrect email or password.')
        throw new Error(apiError(err, 'Could not sign you in.'))
      }
    }

    const logout = () => {
      tokens.clear()
      setUser(null)
    }

    const updateProfile = async ({ name, phone, address }) => {
      try {
        const { data } = await api.patch('/auth/me/', { name, phone, address })
        setUser(data)
      } catch (err) {
        throw new Error(apiError(err, 'Could not save your profile.'))
      }
    }

    return { user, loading, register, login, logout, updateProfile }
  }, [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)