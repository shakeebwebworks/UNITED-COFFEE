import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '../components/layout/Layout.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import Reveal from '../components/common/Reveal.jsx'
import { gallery } from '../data/content.js'

export default function Gallery() {
  const [open, setOpen] = useState(null)

  const step = useCallback((n) => setOpen((i) => (i === null ? i : (i + n + gallery.length) % gallery.length)), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, step])

  return (
    <Layout>
      <PageHeader eyebrow="Our Gallery" title={<>The <em>look</em> of coffee</>} text="A visual journey through our bar, our beans and our people." />
      <section className="uc-section" style={{ paddingTop: 0 }}>
        <div className="uc-container">
          <div className="uc-mosaic">
            {gallery.map((g, i) => (
              <Reveal key={g.src + i} delay={(i % 3) * 0.08} className={`uc-mosaic__item ${g.span}`}>
                <button className="uc-zoom" onClick={() => setOpen(i)} aria-label={`Open ${g.alt}`}>
                  <img src={g.src} alt={g.alt} loading="lazy" onError={(e) => { e.currentTarget.style.opacity = 0 }} />
                  <span><i className="bi bi-arrows-fullscreen"></i></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="uc-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button className="uc-lightbox__close" onClick={() => setOpen(null)} aria-label="Close"><i className="bi bi-x-lg"></i></button>
            <button className="uc-lightbox__nav is-prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous"><i className="bi bi-chevron-left"></i></button>
            <motion.img
              key={open}
              src={gallery[open].src}
              alt={gallery[open].alt}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="uc-lightbox__nav is-next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next"><i className="bi bi-chevron-right"></i></button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}