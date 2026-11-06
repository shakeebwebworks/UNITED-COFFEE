import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/profile'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) return setError('Enter your email and password.')
    setBusy(true)
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Layout>
      <section className="uc-section">
        <div className="uc-auth">
          <span className="uc-eyebrow">Customer Login</span>
          <h1 className="uc-title">Welcome <em>back</em></h1>
          <form className="uc-form" onSubmit={submit} noValidate>
            {error && <div className="uc-alert is-error" role="alert">{error}</div>}
            <div className="uc-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" className="uc-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="uc-field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" autoComplete="current-password" className="uc-input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <button className="uc-btn uc-btn--gold" type="submit" disabled={busy}>{busy ? 'Signing in...' : 'Sign In'}</button>
            <p className="uc-auth__alt">New here? <Link to="/register" state={{ from }}>Create an account</Link></p>
          </form>
        </div>
      </section>
    </Layout>
  )
}