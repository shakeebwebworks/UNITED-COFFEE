import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider><CartProvider>
          <ScrollToTop />
          <AppRoutes />
        </CartProvider></ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}