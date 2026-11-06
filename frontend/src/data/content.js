import { img } from './img.js'

export const site = {
  phone: '+91 98765 43210',
  email: 'hello@unitedcoffee.com',
  address: '12 Roastery Lane, Bandra West, Mumbai 400050',
  hours: [
    ['Mon – Fri', '7:00 AM – 10:00 PM'],
    ['Sat – Sun', '8:00 AM – 11:00 PM'],
  ],
  socials: [
    { icon: 'bi-instagram', label: 'Instagram', href: '#' },
    { icon: 'bi-facebook', label: 'Facebook', href: '#' },
    { icon: 'bi-twitter-x', label: 'X', href: '#' },
    { icon: 'bi-youtube', label: 'YouTube', href: '#' },
  ],
}

export const images = {
  story: img('photo-1447933601403-0c6688de566e', 1100),
  story2: img('photo-1442512595331-e89e73853f31'),
  experience: img('photo-1511920170033-f8396924c348', 1100),
  about: img('photo-1554118811-1e0d58224f24', 1200),
  about2: img('photo-1559925393-8be0ec4767c8', 1000),
}

export const stats = [
  { value: '12+', label: 'Origins' },
  { value: '40k', label: 'Cups a month' },
  { value: '4.9', label: 'Average rating' },
]

export const experience = [
  {
    icon: 'bi-geo-alt',
    title: 'Direct Trade Sourcing',
    text: 'We buy straight from farmers we know by name, paying well above fair-trade prices.',
  },
  {
    icon: 'bi-fire',
    title: 'Small-Batch Roasting',
    text: 'Roasted in-house every morning in small batches, so every cup is fresh and consistent.',
  },
  {
    icon: 'bi-droplet-half',
    title: 'Precision Brewing',
    text: 'Water, temperature, grind and time are measured for every pour, never guessed.',
  },
  {
    icon: 'bi-cup-hot',
    title: 'Served With Intent',
    text: 'Q-Grader baristas craft each drink slowly, the way specialty coffee deserves.',
  },
]

export const values = [
  { icon: 'bi-heart', title: 'Craft First', text: 'We never rush a cup. Quality always comes before speed.' },
  { icon: 'bi-globe-americas', title: 'Honest Origins', text: 'Every bag tells you the farm, the altitude and the harvest.' },
  { icon: 'bi-recycle', title: 'Mindful Footprint', text: 'Compostable packaging and a zero-waste roastery.' },
]

export const timeline = [
  { year: '2014', text: 'Started as a 6-seat espresso counter in Bandra.' },
  { year: '2017', text: 'Opened our own roastery and began direct trade sourcing.' },
  { year: '2021', text: 'Q-Grader certified team and our first national award.' },
  { year: '2025', text: 'Featured in Monocle and launched home delivery.' },
]

export const reviews = [
  {
    name: 'Aisha Khan',
    role: 'Food Blogger',
    rating: 5,
    text: 'The best flat white in Mumbai, no contest. You can taste the care in every cup.',
  },
  {
    name: 'Rohan Mehta',
    role: 'Architect',
    rating: 5,
    text: 'The space, the aroma, the service. It feels like a small European cafe.',
  },
  {
    name: 'Sara Fernandes',
    role: 'Designer',
    rating: 5,
    text: 'I ordered the Ethiopian beans for home. Fresh, floral and beautifully packed.',
  },
  {
    name: 'Imran Shaikh',
    role: 'Entrepreneur',
    rating: 4,
    text: 'Delivery arrived hot and perfectly packed. My go-to for morning meetings.',
  },
]

export const gallery = [
  { src: img('photo-1495474472287-4d71bcdd2085', 900), alt: 'Cappuccino with latte art', span: 'tall' },
  { src: img('photo-1509042239860-f550ce710b93', 900), alt: 'Espresso shot', span: '' },
  { src: img('photo-1514432324607-a09d9b4aefdd', 900), alt: 'Latte in a ceramic cup', span: '' },
  { src: img('photo-1461023058943-07fcbe16d735', 900), alt: 'Coffee beans and cup', span: 'wide' },
  { src: img('photo-1497935586351-b67a49e012bf', 900), alt: 'Pour over coffee', span: '' },
  { src: img('photo-1521017432531-fbd92d768814', 900), alt: 'Cafe interior', span: 'tall' },
  { src: img('photo-1445116572660-236099ec97a0', 900), alt: 'Barista at work', span: '' },
  { src: img('photo-1447933601403-0c6688de566e', 900), alt: 'Roasted beans', span: '' },
]