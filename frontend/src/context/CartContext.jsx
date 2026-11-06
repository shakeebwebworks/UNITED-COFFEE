import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../api/client.js'
import { useAuth } from './AuthContext.jsx'

const CartContext = createContext(null)
const KEY = 'uc_cart'

const loadLocal = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

const fromServer = (data) =>
  data.items.map((i) => ({
    id: i.product.id,
    itemId: i.id,
    name: i.product.name,
    price: i.product.price,
    image: i.product.image,
    category: i.product.category,
    qty: i.quantity,
  }))

export function CartProvider({ children }) {
  const { user, loading } = useAuth()
  const [items, setItems] = useState(loadLocal)

  useEffect(() => {
    if (loading) return
    let alive = true

    if (!user) {
      setItems(loadLocal())
      return
    }

    ;(async () => {
      try {
        const local = loadLocal()
        if (local.length) {
          for (const i of local) {
            await api.post('/cart/items/', { product_id: i.id, quantity: i.qty })
          }
          localStorage.removeItem(KEY)
        }
        const { data } = await api.get('/cart/')
        if (alive) setItems(fromServer(data))
      } catch {
        /* keep current items if the server is unreachable */
      }
    })()

    return () => { alive = false }
  }, [user?.id, loading])

  const value = useMemo(() => {
    const updateLocal = (fn) =>
      setItems((prev) => {
        const next = fn(prev)
        try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
        return next
      })

    const sync = (promise) =>
      promise.then(({ data }) => setItems(fromServer(data))).catch(() => {})

    const add = (p, qty = 1) => {
      if (user) return sync(api.post('/cart/items/', { product_id: p.id, quantity: qty }))
      updateLocal((prev) => {
        const found = prev.find((i) => i.id === p.id)
        if (found) return prev.map((i) => (i.id === p.id ? { ...i, qty: Math.min(20, i.qty + qty) } : i))
        return [...prev, { id: p.id, name: p.name, price: p.price, image: p.image, category: p.category, qty }]
      })
    }

    const setQty = (id, qty) => {
      const q = Math.max(1, Math.min(20, qty))
      if (user) {
        const item = items.find((i) => i.id === id)
        if (!item) return
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: q } : i)))
        return sync(api.patch(`/cart/items/${item.itemId}/`, { quantity: q }))
      }
      updateLocal((prev) => prev.map((i) => (i.id === id ? { ...i, qty: q } : i)))
    }

    const remove = (id) => {
      if (user) {
        const item = items.find((i) => i.id === id)
        if (!item) return
        setItems((prev) => prev.filter((i) => i.id !== id))
        return sync(api.delete(`/cart/items/${item.itemId}/`))
      }
      updateLocal((prev) => prev.filter((i) => i.id !== id))
    }

    const clear = () => {
      if (user) {
        setItems([])
        return api.delete('/cart/').catch(() => {})
      }
      updateLocal(() => [])
    }

    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0)
    return { items, add, remove, setQty, clear, count, subtotal }
  }, [items, user])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)