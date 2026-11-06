import { useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function useHeroAnimation(rootRef, ready) {
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.set('.uc-word', { yPercent: 110, opacity: 0 })
      gsap.set('.uc-hero__eyebrow, .uc-hero__text, .uc-hero__cta .uc-btn, .uc-strip__item', { y: 30, opacity: 0 })
      gsap.set('.uc-hero__cups', { x: 180, opacity: 0, scale: 0.92 })
      gsap.set('.uc-hero__glow', { opacity: 0, scale: 0.6 })
      gsap.set('.uc-bean', { opacity: 0, scale: 0.4 })
    }, rootRef)
    return () => ctx.revert()
  }, [rootRef])

  useEffect(() => {
    if (!ready || reduceMotion()) return
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.to('.uc-hero__glow', { opacity: 1, scale: 1, duration: 1.6 }, 0)
        .to('.uc-bean', { opacity: 1, scale: 1, duration: 1.4, stagger: 0.12, ease: 'back.out(1.6)' }, 0.1)
        .to('.uc-hero__eyebrow', { y: 0, opacity: 1, duration: 0.9 }, 0.2)
        .to('.uc-word', { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 0.35)
        .to('.uc-hero__text', { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
        .to('.uc-hero__cta .uc-btn', { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, '-=0.6')
        .to('.uc-hero__cups', { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }, 0.5)
        .to('.uc-strip__item', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, '-=0.8')

      gsap.to('.uc-hero__cups', { y: -16, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.2 })
      gsap.to('.uc-hero__glow', { scale: 1.08, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.2 })

      gsap.utils.toArray('.uc-bean').forEach((el) => {
        gsap.to(el, {
          x: gsap.utils.random(-16, 16),
          y: gsap.utils.random(-24, 24),
          rotation: `+=${gsap.utils.random(-30, 30)}`,
          duration: gsap.utils.random(3.5, 6.5),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 1.5),
        })
      })
    }, rootRef)

    let cleanup = () => {}

    if (window.matchMedia('(hover: hover)').matches) {
      const beans = [...root.querySelectorAll('.uc-bean')].map((el) => ({
        depth: parseFloat(el.getAttribute('data-depth')) || 1,
        x: gsap.quickTo(el, 'xPercent', { duration: 1.3, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'yPercent', { duration: 1.3, ease: 'power3.out' }),
      }))
      const visual = root.querySelector('.uc-hero__visual')
      const vx = gsap.quickTo(visual, 'x', { duration: 1.6, ease: 'power3.out' })
      const vy = gsap.quickTo(visual, 'y', { duration: 1.6, ease: 'power3.out' })

      const onMove = (e) => {
        const r = root.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        beans.forEach((b) => {
          b.x(-nx * b.depth * 70)
          b.y(-ny * b.depth * 70)
        })
        vx(nx * -18)
        vy(ny * -18)
      }
      const onLeave = () => {
        beans.forEach((b) => { b.x(0); b.y(0) })
        vx(0); vy(0)
      }

      const cups = root.querySelector('.uc-hero__cups')
      const onEnter = () => gsap.to(cups, { scale: 1.04, rotation: -2, duration: 0.7, ease: 'power3.out', overwrite: 'auto' })
      const onOut = () => gsap.to(cups, { scale: 1, rotation: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' })

      root.addEventListener('mousemove', onMove)
      root.addEventListener('mouseleave', onLeave)
      cups.addEventListener('mouseenter', onEnter)
      cups.addEventListener('mouseleave', onOut)

      cleanup = () => {
        root.removeEventListener('mousemove', onMove)
        root.removeEventListener('mouseleave', onLeave)
        cups.removeEventListener('mouseenter', onEnter)
        cups.removeEventListener('mouseleave', onOut)
      }
    }

    return () => {
      cleanup()
      ctx.revert()
    }
  }, [ready, rootRef])
}