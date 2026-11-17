import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CalendarDays,
  Leaf
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';
import { useCart } from '../context/CartContext';
import { getOpenStatus } from '../utils/hours';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const openStatus = getOpenStatus(restaurantInfo.operatingHours);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Location', path: '/location' },
    { name: 'Contact & Book', path: '/contact' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-300/80 shadow-xs transition-all">
      {/* Top micro bar for announcement & live status */}
      <div className="bg-garden-900 text-cream-100 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
              <span className="font-medium">{openStatus.statusText}</span>
              <span className="text-garden-300">({openStatus.subText})</span>
            </span>
            <span className="text-garden-300 hidden md:inline">•</span>
            <span className="hidden md:flex items-center space-x-1 text-garden-200">
              <MapPin className="w-3 h-3 text-terracotta-400" />
              <span>G.H. Patil Path, Shivajinagar, Pune</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href={`tel:${restaurantInfo.phoneRaw}`} 
              className="hover:text-white flex items-center space-x-1 text-garden-200 transition-colors"
            >
              <Phone className="w-3 h-3 text-terracotta-400" />
              <span>{restaurantInfo.phone}</span>
            </a>
            <span className="text-garden-300">•</span>
            <Link 
              to="/owner-dashboard" 
              className="text-xs text-garden-300 hover:text-white flex items-center space-x-1 transition-colors"
              title="Demo Portal for Restaurant Owner"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-terracotta-400" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" onClick={closeMenu} className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-garden-700 flex items-center justify-center text-cream-100 shadow-md group-hover:bg-garden-600 transition-colors">
              <Leaf className="w-6 h-6 text-terracotta-400 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-garden-900 group-hover:text-garden-700 transition-colors">
                Savannah
              </span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-terracotta-600 -mt-1">
                Garden Restaurant &amp; Cafe
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-garden-100 text-garden-900 font-semibold'
                      : 'text-charcoal-700 hover:text-garden-800 hover:bg-cream-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-garden-800 bg-cream-200 hover:bg-cream-300 rounded-xl transition-colors"
            >
              <CalendarDays className="w-3.5 h-3.5 text-garden-700" />
              <span>Book Table</span>
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 text-garden-900 bg-garden-50 hover:bg-garden-100 border border-garden-200 rounded-2xl transition-all shadow-xs group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-terracotta-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Controls: Cart + Hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              to="/cart"
              onClick={closeMenu}
              className="relative p-2 text-garden-900 bg-garden-50 border border-garden-200 rounded-xl"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-terracotta-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-garden-900 hover:bg-cream-200 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-cream-300 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          {/* Status pill in mobile drawer */}
          <div className="mb-4 p-3 bg-cream-100 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
              <span className="font-semibold text-garden-900">{openStatus.statusText}</span>
              <span className="text-charcoal-700">({openStatus.subText})</span>
            </div>
            <span className="text-[11px] text-terracotta-600 font-medium">Pune</span>
          </div>

          <div className="flex flex-col space-y-1 mb-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-garden-700 text-white font-semibold'
                      : 'text-charcoal-800 hover:bg-cream-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cream-200">
            <Link
              to="/contact"
              onClick={closeMenu}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium rounded-xl text-sm transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book Table</span>
            </Link>

            <a
              href={`tel:${restaurantInfo.phoneRaw}`}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-garden-800 hover:bg-garden-900 text-white font-medium rounded-xl text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-terracotta-400" />
              <span>Call Us</span>
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-xs text-charcoal-700">
            <Link
              to="/owner-dashboard"
              onClick={closeMenu}
              className="flex items-center space-x-1.5 text-garden-800 font-medium hover:underline"
            >
              <ShieldCheck className="w-4 h-4 text-terracotta-500" />
              <span>Owner Portal</span>
            </Link>
            <span className="text-charcoal-700 font-mono">demo1234</span>
          </div>
        </div>
      )}
    </header>
  );
}
