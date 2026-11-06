import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/profile'

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (ev) => {
    ev.preventDefault()
    setError('')
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number.'
    if (form.password.length < 8) e.password = 'Use at least 8 characters.'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    setErrors(e)
    if (Object.keys(e).length) return

    setBusy(true)
    try {
      await register(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const fields = [
    ['name', 'Full name', 'text', 'name'],
    ['email', 'Email', 'email', 'email'],
    ['phone', 'Phone', 'tel', 'tel'],
    ['password', 'Password', 'password', 'new-password'],
    ['confirm', 'Confirm password', 'password', 'new-password'],
  ]

  return (
    <Layout>
      <section className="uc-section">
        <div className="uc-auth">
          <span className="uc-eyebrow">Customer Registration</span>
          <h1 className="uc-title">Join <em>United</em></h1>
          <form className="uc-form" onSubmit={submit} noValidate>
            {error && <div className="uc-alert is-error" role="alert">{error}</div>}
            {fields.map(([name, label, type, auto]) => (
              <div className="uc-field" key={name}>
                <label htmlFor={name}>{label}</label>
                <input id={name} name={name} type={type} autoComplete={auto} className="uc-input" value={form[name]} onChange={change} />
                {errors[name] && <small className="uc-error">{errors[name]}</small>}
              </div>
            ))}
            <button className="uc-btn uc-btn--gold" type="submit" disabled={busy}>{busy ? 'Creating...' : 'Create Account'}</button>
            <p className="uc-auth__alt">Already registered? <Link to="/login" state={{ from }}>Sign in</Link></p>
          </form>
        </div>
      </section>
    </Layout>
  )
}