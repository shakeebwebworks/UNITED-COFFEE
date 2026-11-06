import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../api/client.js'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    Promise.all([
      api.get('/products/', { params: { page_size: 100 } }),
      api.get('/categories/'),
    ])
      .then(([p, c]) => {
        if (!alive) return
        if (!Array.isArray(p.data?.results) || !Array.isArray(c.data)) throw new Error('bad response')
        setProducts(p.data.results)
        setCategoryList(c.data)
      })
      .catch(() => { if (alive) setError('Could not load the menu. Is the backend running?') })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      categories: ['All', ...categoryList.map((c) => c.name)],
      getProduct: (id) => products.find((p) => p.id === Number(id)),
    }),
    [products, categoryList, loading, error]
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export const useProducts = () => useContext(ProductsContext)