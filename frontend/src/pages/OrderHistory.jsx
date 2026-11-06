import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import RequireAuth from '../components/common/RequireAuth.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { formatPrice } from '../utils/format.js'
import { getOrders } from '../utils/orders.js'

function Orders() {
  const { user } = useAuth()
  const location = useLocation()
  const [orders, setOrders] = useState(null)
  useEffect(() => { getOrders().then(setOrders).catch(() => setOrders([])) }, [user.email])
  if (orders === null) return <p className="uc-container uc-empty">Loading orders...</p>

  return (
    <div className="uc-container">
      {location.state?.placed && (
        <div className="uc-alert is-ok" role="status">Order placed successfully. Thank you!</div>
      )}

      {orders.length === 0 ? (
        <div className="uc-empty">
          <i className="bi bi-receipt"></i>
          <h3>No orders yet</h3>
          <p>Your orders will appear here.</p>
          <Link to="/menu" className="uc-btn uc-btn--gold">Start Ordering</Link>
        </div>
      ) : (
        <div className="uc-orders">
          {orders.map((o) => (
            <article className="uc-order" key={o.id}>
              <header>
                <div>
                  <h3>#{o.id}</h3>
                  <small>{new Date(o.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</small>
                </div>
                <span className={`uc-status is-${o.status.toLowerCase().replace(/\s/g, '-')}`}>{o.status}</span>
              </header>
              <ul>
                {o.items.map((i) => (
                  <li key={i.id}><span>{i.name} &times; {i.qty}</span><b>{formatPrice(i.price * i.qty)}</b></li>
                ))}
              </ul>
              <footer>
                <span><i className="bi bi-geo-alt"></i> {o.address}</span>
                <strong>{formatPrice(o.totals.total)}</strong>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default function OrderHistory() {
  return (
    <Layout>
      <PageHeader eyebrow="Order History" title={<>Your past <em>orders</em></>} />
      <section className="uc-section" style={{ paddingTop: 0 }}>
        <RequireAuth>
          <Orders />
        </RequireAuth>
      </section>
    </Layout>
  )
}