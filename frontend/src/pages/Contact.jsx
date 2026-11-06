import { useState } from 'react'
import Layout from '../components/layout/Layout.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import Reveal from '../components/common/Reveal.jsx'
import { site } from '../data/content.js'
import api, { apiError } from '../api/client.js'

const empty = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
    return e
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    try {
      await api.post('/contact/', form)
      setSent(true)
      setForm(empty)
    } catch (err) {
      setErrors({ form: apiError(err) })
    }
  }

  return (
    <Layout>
      <PageHeader eyebrow="Contact Us" title={<>Let&apos;s <em>talk</em> coffee</>} text="Questions, catering or wholesale beans? Send us a note and we will reply within a day." />
      <section className="uc-section" style={{ paddingTop: 0 }}>
        <div className="uc-container uc-contact">
          <Reveal x={-30} y={0}>
            <div className="uc-contact__info">
              <div><i className="bi bi-geo-alt"></i><span><b>Address</b>{site.address}</span></div>
              <div><i className="bi bi-telephone"></i><span><b>Phone</b>{site.phone}</span></div>
              <div><i className="bi bi-envelope"></i><span><b>Email</b>{site.email}</span></div>
              <div><i className="bi bi-clock"></i><span><b>Hours</b>{site.hours.map(([d, t]) => <em key={d}>{d}: {t}</em>)}</span></div>
            </div>
          </Reveal>

          <Reveal x={30} y={0} delay={0.1}>
            <form className="uc-form" onSubmit={submit} noValidate>
              {sent && <div className="uc-alert is-ok" role="status">Thank you. Your message has been sent.</div>}{errors.form && <div className="uc-alert is-error" role="alert">{errors.form}</div>}
              <div className="uc-field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" className="uc-input" value={form.name} onChange={change} />
                {errors.name && <small className="uc-error">{errors.name}</small>}
              </div>
              <div className="uc-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="uc-input" value={form.email} onChange={change} />
                {errors.email && <small className="uc-error">{errors.email}</small>}
              </div>
              <div className="uc-field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" className="uc-input" value={form.subject} onChange={change} />
              </div>
              <div className="uc-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" className="uc-input" value={form.message} onChange={change} />
                {errors.message && <small className="uc-error">{errors.message}</small>}
              </div>
              <button className="uc-btn uc-btn--gold" type="submit">Send Message <i className="bi bi-send"></i></button>
            </form>
          </Reveal>
        </div>
      </section>
    </Layout>
  )
}