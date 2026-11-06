import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

export default function Menu() {
  const { products, categories, error } = useProducts()
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [query, setQuery] = useState(params.get('q') || '')
  const [sort, setSort] = useState('popular')
  const inputRef = useRef(null)

  useEffect(() => {
    if (params.get('search') === '1') inputRef.current?.focus()
  }, [params])

  useEffect(() => {
    const next = {}
    if (category !== 'All') next.category = category
    if (query.trim()) next.q = query.trim()
    setParams(next, { replace: true })
  }, [category, query, setParams])

  const list = useMemo(() => {
    let out = products.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (p.name + ' ' + p.category + ' ' + p.notes.join(' ')).toLowerCase().includes(query.trim().toLowerCase())
    )
    if (sort === 'low') out = [...out].sort((a, b) => a.price - b.price)
    if (sort === 'high') out = [...out].sort((a, b) => b.price - a.price)
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating)
    if (sort === 'popular') out = [...out].sort((a, b) => b.reviews - a.reviews)
    return out
  }, [category, query, sort, products])

  return (
    <Layout>
      <PageHeader
        eyebrow="Coffee Menu"
        title={<>Find your <em>cup</em></>}
        text="Espresso, milk coffee, cold coffee and freshly roasted beans for home."
      />
      <section className="uc-section" style={{ paddingTop: 0 }}>
        <div className="uc-container">
          <div className="uc-toolbar">
            <div className="uc-search">
              <i className="bi bi-search"></i>
              <input
                ref={inputRef}
                className="uc-input"
                placeholder="Search coffee, notes, origins..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
              />
            </div>
            <select className="uc-input uc-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              <option value="popular">Most popular</option>
              <option value="rating">Top rated</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>

          <div className="uc-chips">
            {categories.map((c) => (
              <button key={c} className={`uc-chip ${c === category ? 'is-active' : ''}`} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          {error ? <div className="uc-alert is-error">{error}</div> : null}{list.length ? (
            <div className="uc-grid">
              {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          ) : (
            <div className="uc-empty">
              <i className="bi bi-cup"></i>
              <h3>No coffee found</h3>
              <p>Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}