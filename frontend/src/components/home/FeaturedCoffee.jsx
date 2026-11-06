import { Link } from 'react-router-dom'
import Reveal from '../common/Reveal.jsx'
import ProductCard from '../product/ProductCard.jsx'
import { useProducts } from '../../context/ProductsContext.jsx'

export default function FeaturedCoffee() {
  const { products } = useProducts()
  const featured = products.filter((p) => p.featured).slice(0, 4)
  return (
    <section className="uc-section">
      <div className="uc-container">
        <div className="uc-head">
          <Reveal>
            <span className="uc-eyebrow">Featured Coffee</span>
            <h2 className="uc-title">Poured with <em>intent</em></h2>
            <p className="uc-lead">Four signatures from our bar, each crafted to bring out the character of its origin.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/menu" className="uc-btn uc-btn--ghost">View Full Menu <i className="bi bi-arrow-right"></i></Link>
          </Reveal>
        </div>
        <div className="uc-grid">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}