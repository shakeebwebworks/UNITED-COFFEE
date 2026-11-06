import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, text }) {
  return (
    <section className="uc-pagehead">
      <div className="uc-container">
        <motion.span
          className="uc-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          className="uc-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p
            className="uc-lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </section>
  )
}