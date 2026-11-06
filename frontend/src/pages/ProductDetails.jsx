import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import Rating from '../components/common/Rating.jsx'
import Reveal from '../components/common/Reveal.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useProducts } from '../context/ProductsContext.jsx'
import { formatPrice } from '../utils/format.js'

export default function ProductDetails() {
  const { id } = useParams()
  const { products, getProduct, loading } = useProducts()
  const product = getProduct(id)
  const { add } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product && loading) return <Layout><p className="uc-container uc-empty">Loading...</p></Layout>; if (!product) {
    return (
      <Layout>
        <div className="uc-container uc-empty" style={{ padding: '8rem 0' }}>
          <i className="bi bi-cup"></i>
          <h3>Product not found</h3>
          <Link to="/menu" className="uc-btn uc-btn--gold">Back to Menu</Link>
        </div>
      </Layout>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const onAdd = () => {
    add(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }
  const buyNow = () => {
    add(product, qty)
    navigate('/checkout')
  }

  return (
    <Layout>
      <section className="uc-section">
        <div className="uc-container">
          <nav className="uc-crumbs">
            <Link to="/">Home</Link> / <Link to="/menu">Menu</Link> / <span>{product.name}</span>
          </nav>

          <div className="uc-detail">
            <Reveal x={-30} y={0}>
              <div className="uc-detail__img">
                <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.style.opacity = 0 }} />
              </div>
            </Reveal>

            <Reveal x={30} y={0} delay={0.1}>
              <div className="uc-detail__info">
                <span className="uc-eyebrow">{product.category}</span>
                <h1 className="uc-title">{product.name}</h1>
                <Rating value={product.rating} count={product.reviews} />
                <p className="uc-detail__price">{formatPrice(product.price)}</p>
                <p className="uc-lead">{product.description}</p>

                <div className="uc-notes">
                  <h4>Tasting Notes</h4>
                  <div>{product.notes.map((n) => <span key={n} className="uc-chip">{n}</span>)}</div>
                </div>

                <div className="uc-detail__buy">
                  <div className="uc-qty">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"><i className="bi bi-dash"></i></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity"><i className="bi bi-plus"></i></button>
                  </div>
                  <button className="uc-btn uc-btn--gold" onClick={onAdd}>
                    <i className={`bi ${added ? 'bi-check2' : 'bi-bag-plus'}`}></i> {added ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button className="uc-btn uc-btn--ghost" onClick={buyNow}>Buy Now</button>
                </div>
              </div>
            </Reveal>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: '6rem' }}>
              <h2 className="uc-title" style={{ marginBottom: '2rem' }}>You may also <em>like</em></h2>
              <div className="uc-grid">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}