import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ solid = false }) {
  const { count } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`uc-nav ${scrolled ? 'is-scrolled' : ''} ${solid ? 'uc-nav--solid' : ''}`}>
      <Link to="/" className="uc-nav__logo" onClick={() => setOpen(false)}>
        <i className="bi bi-cup-hot"></i>
        <span>United <em>Coffee</em></span>
      </Link>

      <nav className={`uc-nav__links ${open ? 'is-open' : ''}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            onClick={() => setOpen(false)}
            className={({ isActive }) => `uc-nav__link ${isActive ? 'is-active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to={user ? '/profile' : '/login'} className="uc-btn uc-btn--gold uc-nav__signin d-lg-none" onClick={() => setOpen(false)}>
          Sign In
        </Link>
      </nav>

      <div className="uc-nav__actions">
        <button className="uc-nav__icon" aria-label="Search" onClick={() => navigate('/menu?search=1')}><i className="bi bi-search"></i></button>
        <Link to="/cart" className="uc-nav__icon uc-nav__bag" aria-label="Shopping bag">
          <i className="bi bi-bag"></i>
          {count > 0 && <span className="uc-nav__badge">{count}</span>}
        </Link>
        <Link to={user ? '/profile' : '/login'} className="uc-btn uc-btn--ghost uc-nav__signin d-none d-lg-inline-flex">{user ? user.name.split(' ')[0] : 'Sign In'}</Link>
        <button
          className="uc-nav__toggle d-lg-none"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>
      </div>
    </header>
  )
}