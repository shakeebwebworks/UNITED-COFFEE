import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import RequireAuth from '../components/common/RequireAuth.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function ProfileForm() {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '', address: user.address || '' })
  const [saved, setSaved] = useState(false)

  const save = async (e) => {
    e.preventDefault()
    await updateProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  const out = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="uc-container uc-profile">
      <aside className="uc-summary">
        <div className="uc-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <h3>{user.name}</h3>
        <small>{user.email}</small>
        <Link to="/orders" className="uc-btn uc-btn--ghost">My Orders</Link>
        <button className="uc-btn uc-btn--ghost" onClick={out}>Sign Out</button>
      </aside>

      <form className="uc-form" onSubmit={save}>
        <h3>Profile Details</h3>
        {saved && <div className="uc-alert is-ok" role="status">Profile updated.</div>}
        <div className="uc-field">
          <label htmlFor="name">Full name</label>
          <input id="name" className="uc-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="uc-field">
          <label htmlFor="email">Email</label>
          <input id="email" className="uc-input" value={user.email} disabled />
        </div>
        <div className="uc-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" className="uc-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="uc-field">
          <label htmlFor="address">Default address</label>
          <textarea id="address" rows="3" className="uc-input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <button className="uc-btn uc-btn--gold" type="submit">Save Changes</button>
      </form>
    </div>
  )
}

export default function Profile() {
  return (
    <Layout>
      <PageHeader eyebrow="Customer Profile" title={<>Your <em>account</em></>} />
      <section className="uc-section" style={{ paddingTop: 0 }}>
        <RequireAuth>
          <ProfileForm />
        </RequireAuth>
      </section>
    </Layout>
  )
}