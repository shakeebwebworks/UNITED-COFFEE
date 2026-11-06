import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Bean from '../hero/Bean.jsx'
import './loader.css'

const ease = [0.22, 1, 0.36, 1]
const words = ['United', 'Coffee']
const spots = [
  { top: '22%', left: '28%', size: 36, rot: 30 },
  { top: '68%', left: '22%', size: 26, rot: -50 },
  { top: '30%', left: '72%', size: 44, rot: 110 },
  { top: '72%', left: '68%', size: 30, rot: 200 },
]

export default function Loader({ onDone }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(onDone, reduce ? 400 : 2800)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [onDone, reduce])

  return (
    <motion.div
      className="uc-loader"
      role="status"
      aria-label="Loading United Coffee"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease } }}
    >
      {spots.map((b, i) => (
        <motion.div
          key={i}
          className="uc-loader__bean"
          style={{ top: b.top, left: b.left, width: b.size }}
          initial={{ opacity: 0, scale: 0.4, rotate: b.rot - 40 }}
          animate={{ opacity: 1, scale: 1, rotate: b.rot }}
          transition={{ duration: 1.4, delay: 0.5 + i * 0.25, ease }}
        >
          <Bean />
        </motion.div>
      ))}

      <div className="uc-loader__logo">
        <motion.i
          className="bi bi-cup-hot"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        />
        <div className="uc-loader__word">
          {words.map((w, i) => (
            <span className="uc-loader__mask" key={w}>
              <motion.span
                className={i ? 'is-gold' : ''}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.2, ease }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </div>
        <motion.span
          className="uc-loader__tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          Specialty Coffee House
        </motion.span>
        <div className="uc-loader__bar"><span /></div>
      </div>
    </motion.div>
  )
}