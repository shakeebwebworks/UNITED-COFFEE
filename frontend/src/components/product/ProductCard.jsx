import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../common/Reveal.jsx'
import Rating from '../common/Rating.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../utils/format.js'

export default function ProductCard({ product, index = 0 }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const onAdd = () => {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <Reveal delay={(index % 4) * 0.08}>
      <article className="uc-card">
        <Link to={`/product/${product.id}`} className="uc-card__img">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.opacity = 0 }}
          />
          <span className="uc-card__tag">{product.category}</span>
        </Link>
        <div className="uc-card__body">
          <Rating value={product.rating} count={product.reviews} />
          <h3 className="uc-card__name">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <div className="uc-card__foot">
            <span className="uc-card__price">{formatPrice(product.price)}</span>
            <button className={`uc-card__add ${added ? 'is-added' : ''}`} onClick={onAdd}>
              <i className={`bi ${added ? 'bi-check2' : 'bi-bag-plus'}`}></i>
              {added ? 'Added' : 'Add'}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}