import Layout from '../components/layout/Layout.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import Reveal from '../components/common/Reveal.jsx'
import ParallaxImage from '../components/common/ParallaxImage.jsx'
import { images, stats, values, timeline } from '../data/content.js'

export default function About() {
  return (
    <Layout>
      <PageHeader
        eyebrow="About Us"
        title={<>A house built on <em>patience</em></>}
        text="We are a small team of roasters, baristas and storytellers who believe a great cup takes time."
      />

      <section className="uc-section">
        <div className="uc-container uc-story">
          <ParallaxImage src={images.about} alt="United Coffee cafe interior" className="uc-about__img" />
          <div className="uc-story__copy">
            <Reveal><span className="uc-eyebrow">Who We Are</span></Reveal>
            <Reveal delay={0.1}><h2 className="uc-title">Roasted in Mumbai, <em>shared</em> with the world</h2></Reveal>
            <Reveal delay={0.2}>
              <p className="uc-lead">
                Every bag we sell is traceable to a farm. Every cup we pour is measured, tasted and served by a
                Q-Grader certified barista. That is how we keep coffee honest.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="uc-stats">
                {stats.map((s) => (
                  <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="uc-section uc-section--alt">
        <div className="uc-container">
          <Reveal><span className="uc-eyebrow">Our Values</span><h2 className="uc-title">What we <em>stand</em> for</h2></Reveal>
          <div className="uc-values">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12}>
                <div className="uc-value">
                  <i className={`bi ${v.icon}`}></i>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="uc-section">
        <div className="uc-container">
          <Reveal><span className="uc-eyebrow">Our Journey</span><h2 className="uc-title">Ten years, <em>one</em> obsession</h2></Reveal>
          <div className="uc-timeline">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.1}>
                <div className="uc-timeline__item">
                  <strong>{t.year}</strong>
                  <p>{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}