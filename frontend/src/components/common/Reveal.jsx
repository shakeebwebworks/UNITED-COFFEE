import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 40,
  x = 0,
  duration = 0.9,
  className = '',
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}