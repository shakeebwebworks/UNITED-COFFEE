import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Menu from '../pages/Menu.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'
import Gallery from '../pages/Gallery.jsx'
import Contact from '../pages/Contact.jsx'
import Cart from '../pages/Cart.jsx'
import Checkout from '../pages/Checkout.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Profile from '../pages/Profile.jsx'
import OrderHistory from '../pages/OrderHistory.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<OrderHistory />} />
    </Routes>
  )
}