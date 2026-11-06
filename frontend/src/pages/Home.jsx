import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from '../components/common/Loader.jsx'
import Hero from '../components/hero/Hero.jsx'
import FeaturedCoffee from '../components/home/FeaturedCoffee.jsx'
import OurStory from '../components/home/OurStory.jsx'
import CoffeeExperience from '../components/home/CoffeeExperience.jsx'
import BestSellers from '../components/home/BestSellers.jsx'
import GallerySection from '../components/home/GallerySection.jsx'
import Reviews from '../components/home/Reviews.jsx'
import Newsletter from '../components/home/Newsletter.jsx'
import Footer from '../components/layout/Footer.jsx'

export default function Home() {
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])

  return (
    <main>
      <AnimatePresence>{!ready && <Loader onDone={done} />}</AnimatePresence>
      <Hero ready={ready} />
      <FeaturedCoffee />
      <OurStory />
      <CoffeeExperience />
      <BestSellers />
      <GallerySection />
      <Reviews />
      <Newsletter />
      <Footer />
    </main>
  )
}