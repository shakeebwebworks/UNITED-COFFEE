import { Link } from 'react-router-dom'
import Navbar from '../layout/Navbar.jsx'
import Bean from './Bean.jsx'
import { useRef } from 'react'
import useHeroAnimation from '../../hooks/useHeroAnimation.js'
import './hero.css'

const lines = [
  [{ t: 'A' }, { t: 'slow' }, { t: 'ritual,' }],
  [{ t: 'poured', italic: true }, { t: 'with' }, { t: 'intent.' }],
]

const beans = [
  { top: '12%', left: '46%', size: 46, rot: 25, depth: 1.6 },
  { top: '70%', left: '40%', size: 34, rot: -40, depth: 1.2 },
  { top: '20%', left: '88%', size: 58, rot: 70, depth: 2 },
  { top: '82%', left: '82%', size: 40, rot: 140, depth: 1.4 },
  { top: '48%', left: '52%', size: 26, rot: -15, depth: 0.8 },
  { top: '8%', left: '70%', size: 30, rot: 200, depth: 1 },
]

const strip = [
  { icon: 'bi-cup-hot', label: 'Best Coffee Shop' },
  { icon: 'bi-award', label: 'Q-Grader Baristas' },
  { icon: 'bi-globe-americas', label: 'Direct Trade Origins' },
  { icon: 'bi-newspaper', label: 'Featured in Monocle' },
]

export default function Hero({ ready = true }) {
  const rootRef = useRef(null)
  useHeroAnimation(rootRef, ready)

  return (
    <section className="uc-stage">
      <div className="uc-hero" id="hero" ref={rootRef}>
        <Navbar />

        <div className="uc-hero__beans" aria-hidden="true">
          {beans.map((b, i) => (
            <Bean
              key={i}
              depth={b.depth}
              style={{
                top: b.top,
                left: b.left,
                width: b.size,
                transform: `rotate(${b.rot}deg)`,
              }}
            />
          ))}
        </div>

        <div className="uc-hero__grid">
          <div className="uc-hero__copy">
            <span className="uc-hero__eyebrow">Specialty Coffee House</span>

            <h1 className="uc-hero__title" aria-label="A slow ritual, poured with intent.">
              {lines.map((line, li) => (
                <span className="uc-line" key={li} aria-hidden="true">
                  {line.map((w, wi) => (
                    <span className="uc-word-mask" key={wi}>
                      <span className={`uc-word ${w.italic ? 'is-italic' : ''}`}>{w.t}</span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="uc-hero__text">
              United Coffee is a premium specialty coffee house — handcrafting single-origin espresso.
            </p>

            <div className="uc-hero__cta">
              <Link to="/menu" className="uc-btn uc-btn--gold">
                Explore More <i className="bi bi-arrow-right"></i>
              </Link>
              <Link to="/menu" className="uc-btn uc-btn--ghost">
                Get Delivery <i className="bi bi-bicycle"></i>
              </Link>
            </div>
          </div>

          <div className="uc-hero__visual">
            <div className="uc-hero__glow"></div>
            <img
              className="uc-hero__cups"
              src="/images/hero-cups.png"
              alt="United Coffee espresso cups with a coffee splash"
              onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
            />
          </div>
        </div>

        <ul className="uc-strip">
          {strip.map((s) => (
            <li className="uc-strip__item" key={s.label}>
              <i className={`bi ${s.icon}`}></i>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}