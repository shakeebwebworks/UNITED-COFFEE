import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from '../common/Reveal.jsx'
import Rating from '../common/Rating.jsx'
import { reviews } from '../../data/content.js'

const variants = {
  enter: (d) => ({ opacity: 0, x: d * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d * -60 }),
}

export default function Reviews() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const reduce = useReducedMotion()

  const go = (n) => {
    setDir(n > 0 ? 1 : -1)
    setI((p) => (p + n + reviews.length) % reviews.length)
  }
  const jump = (n) => {
    setDir(n > i ? 1 : -1)
    setI(n)
  }

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => {
      setDir(1)
      setI((p) => (p + 1) % reviews.length)
    }, 6500)
    return () => clearInterval(t)
  }, [reduce, i])

  const r = reviews[i]

  return (
    <section className="uc-section uc-section--alt">
      <div className="uc-container uc-reviews">
        <Reveal>
          <span className="uc-eyebrow">Customer Reviews</span>
          <h2 className="uc-title">Words from our <em>guests</em></h2>
        </Reveal>

        <div className="uc-reviews__stage">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={i}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="uc-review"
            >
              <i className="bi bi-quote"></i>
              <blockquote>{r.text}</blockquote>
              <Rating value={r.rating} />
              <figcaption><strong>{r.name}</strong><span>{r.role}</span></figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="uc-reviews__nav">
          <button onClick={() => go(-1)} aria-label="Previous review"><i className="bi bi-arrow-left"></i></button>
          <div className="uc-dots">
            {reviews.map((_, n) => (
              <button key={n} className={n === i ? 'is-active' : ''} onClick={() => jump(n)} aria-label={`Review ${n + 1}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review"><i className="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </section>
  )
}