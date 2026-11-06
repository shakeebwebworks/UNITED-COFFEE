import { img } from './img.js'

export const categories = ['All', 'Espresso', 'Milk Coffee', 'Cold Coffee', 'Beans']

export const products = [
  {
    id: 1, name: 'Signature Espresso', category: 'Espresso', price: 180, rating: 4.9, reviews: 214,
    image: img('photo-1510707577719-ae7c14805e3a', 800),
    description: 'Our house blend pulled long and slow. Rich crema, deep body and a clean, sweet finish.',
    notes: ['Dark chocolate', 'Caramel', 'Hazelnut'], featured: true, bestSeller: true,
  },
  {
    id: 2, name: 'Velvet Cappuccino', category: 'Milk Coffee', price: 240, rating: 4.8, reviews: 189,
    image: img('photo-1495474472287-4d71bcdd2085', 800),
    description: 'Double ristretto with silky microfoam and a signature pour of latte art.',
    notes: ['Cocoa', 'Vanilla', 'Toasted almond'], featured: true, bestSeller: true,
  },
  {
    id: 3, name: 'Golden Flat White', category: 'Milk Coffee', price: 260, rating: 4.9, reviews: 162,
    image: img('photo-1514432324607-a09d9b4aefdd', 800),
    description: 'A velvety flat white with a touch of honey-sweet crema, made with single-origin beans.',
    notes: ['Honey', 'Brown sugar', 'Milk chocolate'], featured: true, bestSeller: false,
  },
  {
    id: 4, name: 'Nitro Cold Brew', category: 'Cold Coffee', price: 290, rating: 4.7, reviews: 131,
    image: img('photo-1517701550927-30cf4ba1dba5', 800),
    description: 'Steeped for 18 hours and infused with nitrogen for a smooth, cascading pour.',
    notes: ['Dark cherry', 'Cocoa nibs', 'Molasses'], featured: true, bestSeller: true,
  },
  {
    id: 5, name: 'Iced Hazelnut Latte', category: 'Cold Coffee', price: 270, rating: 4.6, reviews: 97,
    image: img('photo-1461023058943-07fcbe16d735', 800),
    description: 'Chilled espresso over ice with house-made hazelnut syrup and cold milk.',
    notes: ['Hazelnut', 'Cream', 'Roasted nuts'], featured: false, bestSeller: true,
  },
  {
    id: 6, name: 'Ethiopian Yirgacheffe 250g', category: 'Beans', price: 780, rating: 4.9, reviews: 76,
    image: img('photo-1447933601403-0c6688de566e', 800),
    description: 'Washed single-origin beans, light roast. Bright, floral and tea-like.',
    notes: ['Jasmine', 'Bergamot', 'Peach'], featured: false, bestSeller: false,
  },
  {
    id: 7, name: 'Colombian Huila 250g', category: 'Beans', price: 720, rating: 4.8, reviews: 64,
    image: img('photo-1442512595331-e89e73853f31', 800),
    description: 'Medium roast beans with a juicy sweetness and a balanced, round cup.',
    notes: ['Red apple', 'Panela', 'Almond'], featured: false, bestSeller: false,
  },
  {
    id: 8, name: 'Doppio Ristretto', category: 'Espresso', price: 220, rating: 4.7, reviews: 85,
    image: img('photo-1509042239860-f550ce710b93', 800),
    description: 'A concentrated double shot, short and intense, for those who like it bold.',
    notes: ['Dark berry', 'Bitter cocoa', 'Spice'], featured: false, bestSeller: false,
  },
]

export const getProduct = (id) => products.find((p) => p.id === Number(id))