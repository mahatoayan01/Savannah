import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Location from './pages/Location';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import OwnerLogin from './pages/OwnerLogin';
import OwnerDashboard from './pages/OwnerDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cream-50 text-charcoal-900 selection:bg-garden-600 selection:text-white">
        <ScrollToTop />
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/location" element={<Location />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/owner-login" element={<OwnerLogin />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <FloatingActions />
        <Footer />
      </div>
    </CartProvider>
  );
}
