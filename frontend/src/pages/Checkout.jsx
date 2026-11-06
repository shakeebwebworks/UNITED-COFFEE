import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import RequireAuth from '../components/common/RequireAuth.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { calcTotals, formatPrice } from '../utils/format.js'
import { placeOrder } from '../utils/orders.js'

function CheckoutForm() {
  const { user } = useAuth()
  const { items, subtotal, clear } = useCart()
  const navigate = useNavigate()
  const totals = calcTotals(subtotal)

  const [form, setForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '',
    city: '',
    pincode: '',
    payment: 'cod',
    notes: '',
  })
  const [errors, setErrors] = useState({})

  if (items.length === 0) return <Navigate to="/cart" replace />

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (ev) => {
    ev.preventDefault()
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number.'
    if (form.address.trim().length < 6) e.address = 'Enter your delivery address.'
    if (!form.city.trim()) e.city = 'Enter your city.'
    if (!/^[0-9]{6}$/.test(form.pincode)) e.pincode = 'Enter a 6-digit pincode.'
    setErrors(e)
    if (Object.keys(e).length) return

    try {
      await placeOrder({
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        payment: form.payment,
        notes: form.notes,
        items: items.map((i) => ({ product_id: i.id, quantity: i.qty })),
      })
      clear()
      navigate('/orders', { state: { placed: true } })
    } catch (err) {
      setErrors({ form: err.message })
    }
  }

  const Field = ({ name, label, type = 'text', ...rest }) => (
    <div className="uc-field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} className="uc-input" value={form[name]} onChange={change} {...rest} />
      {errors[name] && <small className="uc-error">{errors[name]}</small>}
    </div>
  )

  return (
    <div className="uc-container uc-checkout">
      <form className="uc-form" onSubmit={submit} noValidate>
        <h3>Delivery Details</h3>{errors.form && <div className="uc-alert is-error" role="alert">{errors.form}</div>}
        {Field({ name: 'name', label: 'Full name' })}
        {Field({ name: 'phone', label: 'Phone number', type: 'tel' })}
        {Field({ name: 'address', label: 'Address' })}
        <div className="uc-row">
          {Field({ name: 'city', label: 'City' })}
          {Field({ name: 'pincode', label: 'Pincode', inputMode: 'numeric', maxLength: 6 })}
        </div>

        <h3 style={{ marginTop: '1.5rem' }}>Payment</h3>
        <div className="uc-pay">
          {[
            ['cod', 'Cash on Delivery'],
            ['upi', 'UPI on Delivery'],
            ['card', 'Card on Delivery'],
          ].map(([v, l]) => (
            <label key={v} className={form.payment === v ? 'is-active' : ''}>
              <input type="radio" name="payment" value={v} checked={form.payment === v} onChange={change} />
              {l}
            </label>
          ))}
        </div>

        <div className="uc-field">
          <label htmlFor="notes">Order notes (optional)</label>
          <textarea id="notes" name="notes" rows="3" className="uc-input" value={form.notes} onChange={change} />
        </div>
        <button className="uc-btn uc-btn--gold" type="submit">Place Order &middot; {formatPrice(totals.total)}</button>
      </form>

      <aside className="uc-summary">
        <h3>Your Items</h3>
        <ul className="uc-summary__items">
          {items.map((i) => (
            <li key={i.id}><span>{i.name} &times; {i.qty}</span><b>{formatPrice(i.price * i.qty)}</b></li>
          ))}
        </ul>
        <dl>
          <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
          <div><dt>Delivery</dt><dd>{totals.delivery ? formatPrice(totals.delivery) : 'Free'}</dd></div>
          <div><dt>GST (5%)</dt><dd>{formatPrice(totals.tax)}</dd></div>
          <div className="is-total"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
        </dl>
      </aside>
    </div>
  )
}

export default function Checkout() {
  return (
    <Layout>
      <PageHeader eyebrow="Checkout" title={<>Almost <em>there</em></>} />
      <section className="uc-section" style={{ paddingTop: 0 }}>
        <RequireAuth>
          <CheckoutForm />
        </RequireAuth>
      </section>
    </Layout>
  )
}