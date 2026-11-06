import Reveal from '../common/Reveal.jsx'
import ParallaxImage from '../common/ParallaxImage.jsx'
import { experience, images } from '../../data/content.js'

export default function CoffeeExperience() {
  return (
    <section className="uc-section">
      <div className="uc-container uc-exp">
        <div className="uc-exp__copy">
          <Reveal><span className="uc-eyebrow">The Coffee Experience</span></Reveal>
          <Reveal delay={0.1}><h2 className="uc-title">From farm to <em>flame</em> to cup</h2></Reveal>
          <div className="uc-exp__list">
            {experience.map((e, i) => (
              <Reveal key={e.title} delay={0.1 + i * 0.1} x={-30} y={0}>
                <div className="uc-exp__item">
                  <span className="uc-exp__icon"><i className={`bi ${e.icon}`}></i></span>
                  <div>
                    <h3>{e.title}</h3>
                    <p>{e.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal x={40} y={0}>
          <ParallaxImage src={images.experience} alt="Barista preparing specialty coffee" className="uc-exp__img" />
        </Reveal>
      </div>
    </section>
  )
}