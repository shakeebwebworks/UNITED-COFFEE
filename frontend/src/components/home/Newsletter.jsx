import { useState } from 'react'
import Reveal from '../common/Reveal.jsx'
import api, { apiError } from '../../api/client.js'

const valid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState({ status: 'idle', message: '' })

  const submit = async (e) => {
    e.preventDefault()
    if (!valid(email)) {
      setState({ status: 'error', message: 'Please enter a valid email address.' })
      return
    }
    try {
      await api.post('/newsletter/', { email })
      setState({ status: 'success', message: 'Welcome to the ritual. Check your inbox soon.' })
      setEmail('')
    } catch (err) {
      setState({ status: 'error', message: apiError(err) })
    }
  }

  return (
    <section className="uc-section">
      <div className="uc-container">
        <Reveal>
          <div className="uc-news">
            <span className="uc-eyebrow">Newsletter</span>
            <h2 className="uc-title">Join the <em>ritual</em></h2>
            <p className="uc-lead">New origins, brewing guides and members-only offers, once a month.</p>
            <form className="uc-news__form" onSubmit={submit} noValidate>
              <input
                type="email"
                className="uc-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button className="uc-btn uc-btn--gold" type="submit">Subscribe</button>
            </form>
            {state.message && (
              <p className={`uc-news__msg ${state.status === 'error' ? 'is-error' : 'is-ok'}`} role="status">{state.message}</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}