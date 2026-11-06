import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import { useCart } from '../context/CartContext.jsx'
import { calcTotals, formatPrice } from '../utils/format.js'

export default function Cart() {
  const { items, setQty, remove, clear, subtotal } = useCart()
  const totals = calcTotals(subtotal)

  return (
    <Layout>
      <PageHeader eyebrow="Shopping Cart" title={<>Your <em>order</em></>} />
      <section className="uc-section" style={{ paddingTop: 0 }}>
        <div className="uc-container">
          {items.length === 0 ? (
            <div className="uc-empty">
              <i className="bi bi-bag"></i>
              <h3>Your cart is empty</h3>
              <p>Add something delicious from our menu.</p>
              <Link to="/menu" className="uc-btn uc-btn--gold">Browse Menu</Link>
            </div>
          ) : (
            <div className="uc-cart">
              <div className="uc-cart__list">
                {items.map((i) => (
                  <div className="uc-cart__row" key={i.id}>
                    <Link to={`/product/${i.id}`} className="uc-cart__img">
                      <img src={i.image} alt={i.name} onError={(e) => { e.currentTarget.style.opacity = 0 }} />
                    </Link>
                    <div className="uc-cart__info">
                      <Link to={`/product/${i.id}`}><h3>{i.name}</h3></Link>
                      <span>{i.category}</span>
                      <b>{formatPrice(i.price)}</b>
                    </div>
                    <div className="uc-qty">
                      <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease quantity"><i className="bi bi-dash"></i></button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase quantity"><i className="bi bi-plus"></i></button>
                    </div>
                    <strong className="uc-cart__line">{formatPrice(i.price * i.qty)}</strong>
                    <button className="uc-cart__remove" onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`}><i className="bi bi-trash3"></i></button>
                  </div>
                ))}
                <button className="uc-link" onClick={clear}>Clear cart</button>
              </div>

              <aside className="uc-summary">
                <h3>Order Summary</h3>
                <dl>
                  <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
                  <div><dt>Delivery</dt><dd>{totals.delivery ? formatPrice(totals.delivery) : 'Free'}</dd></div>
                  <div><dt>GST (5%)</dt><dd>{formatPrice(totals.tax)}</dd></div>
                  <div className="is-total"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
                </dl>
                <small>Free delivery on orders above {formatPrice(999)}.</small>
                <Link to="/checkout" className="uc-btn uc-btn--gold">Proceed to Checkout</Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}