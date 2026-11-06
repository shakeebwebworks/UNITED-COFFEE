import { Link } from 'react-router-dom'
import Reveal from '../common/Reveal.jsx'
import { gallery } from '../../data/content.js'

export default function GallerySection() {
  return (
    <section className="uc-section">
      <div className="uc-container">
        <div className="uc-head">
          <Reveal>
            <span className="uc-eyebrow">Coffee Gallery</span>
            <h2 className="uc-title">Moments from our <em>bar</em></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/gallery" className="uc-btn uc-btn--ghost">Full Gallery <i className="bi bi-arrow-right"></i></Link>
          </Reveal>
        </div>
        <div className="uc-mosaic">
          {gallery.slice(0, 6).map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 0.1} className={`uc-mosaic__item ${g.span}`}>
              <Link to="/gallery" className="uc-zoom" aria-label={g.alt}>
                <img src={g.src} alt={g.alt} loading="lazy" onError={(e) => { e.currentTarget.style.opacity = 0 }} />
                <span><i className="bi bi-plus-lg"></i></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}