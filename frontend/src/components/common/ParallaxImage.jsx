import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export default function ParallaxImage({ src, alt = '', strength = 60, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y: reduce ? 0 : y, scale: reduce ? 1 : 1.2, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}