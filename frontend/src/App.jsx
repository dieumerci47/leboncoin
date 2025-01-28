import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Login from "./pages/Admin/Login";
import ProductManager from "./pages/Admin/ProductManager";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import AdminLayout from "./layouts/AdminLayout";
import OrderManager from "./pages/Admin/OrderManager";
import Settings from "./pages/Admin/Settings";

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* Admin routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="products" element={<ProductManager />} />
                        <Route path="orders" element={<OrderManager />} />
                        <Route path="settings" element={<Settings />} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;
