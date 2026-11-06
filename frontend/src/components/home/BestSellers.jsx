import { Link } from 'react-router-dom'
import Reveal from '../common/Reveal.jsx'
import ProductCard from '../product/ProductCard.jsx'
import { useProducts } from '../../context/ProductsContext.jsx'

export default function BestSellers() {
  const { products } = useProducts()
  const best = products.filter((p) => p.bestSeller).sort((a, b) => b.rating - a.rating).slice(0, 4)
  return (
    <section className="uc-section uc-section--alt">
      <div className="uc-container">
        <div className="uc-head">
          <Reveal>
            <span className="uc-eyebrow">Best Sellers</span>
            <h2 className="uc-title">Loved by our <em>regulars</em></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/menu" className="uc-btn uc-btn--ghost">Shop All <i className="bi bi-arrow-right"></i></Link>
          </Reveal>
        </div>
        <div className="uc-grid">
          {best.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}