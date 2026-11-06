import { Link } from 'react-router-dom'
import Reveal from '../common/Reveal.jsx'
import ParallaxImage from '../common/ParallaxImage.jsx'
import { images, stats } from '../../data/content.js'

export default function OurStory() {
  return (
    <section className="uc-section uc-section--alt">
      <div className="uc-container uc-story">
        <div className="uc-story__media">
          <ParallaxImage src={images.story} alt="Freshly roasted coffee beans" className="uc-story__main" />
          <ParallaxImage src={images.story2} alt="Barista pouring coffee" strength={30} className="uc-story__small" />
        </div>
        <div className="uc-story__copy">
          <Reveal><span className="uc-eyebrow">Our Story</span></Reveal>
          <Reveal delay={0.1}><h2 className="uc-title">Born from a single <em>cup</em></h2></Reveal>
          <Reveal delay={0.2}>
            <p className="uc-lead">
              United Coffee began in 2014 as a six-seat espresso counter with one belief: coffee deserves patience.
              Today we roast in small batches, trade directly with farmers and serve every cup slowly, with intent.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="uc-stats">
              {stats.map((s) => (
                <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <Link to="/about" className="uc-btn uc-btn--gold">Read Our Story <i className="bi bi-arrow-right"></i></Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}