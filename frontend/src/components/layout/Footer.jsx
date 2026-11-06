import { Link } from 'react-router-dom'
import { site } from '../../data/content.js'

const links = [
  ['Home', '/'], ['About', '/about'], ['Menu', '/menu'],
  ['Gallery', '/gallery'], ['Contact', '/contact'], ['My Orders', '/orders'],
]

export default function Footer() {
  return (
    <footer className="uc-footer">
      <div className="uc-container uc-footer__grid">
        <div>
          <Link to="/" className="uc-footer__logo">
            <i className="bi bi-cup-hot"></i> United <em>Coffee</em>
          </Link>
          <p>A premium specialty coffee house, handcrafting single-origin espresso since 2014.</p>
          <div className="uc-footer__social">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}><i className={`bi ${s.icon}`}></i></a>
            ))}
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            {links.map(([label, to]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Visit Us</h4>
          <ul>
            <li><i className="bi bi-geo-alt"></i> {site.address}</li>
            <li><i className="bi bi-telephone"></i> {site.phone}</li>
            <li><i className="bi bi-envelope"></i> {site.email}</li>
          </ul>
        </div>

        <div>
          <h4>Opening Hours</h4>
          <ul>
            {site.hours.map(([d, t]) => (
              <li key={d}><strong>{d}</strong><br />{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="uc-footer__bottom">
        <div className="uc-container">
          <span>&copy; {new Date().getFullYear()} United Coffee. All rights reserved.</span>
          <span>Crafted with intent.</span>
        </div>
      </div>
    </footer>
  )
}