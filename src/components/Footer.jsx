import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ArrowUpRight, 
  Leaf, 
  ShieldCheck 
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';

export default function Footer() {
  return (
    <footer className="bg-garden-950 text-cream-100 pt-16 pb-12 border-t border-garden-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-garden-800/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-garden-700 flex items-center justify-center text-cream-100 shadow-sm">
                <Leaf className="w-5 h-5 text-terracotta-400" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-cream-50">
                  Savannah
                </h3>
                <p className="text-[11px] font-medium tracking-wider uppercase text-terracotta-400 -mt-0.5">
                  Garden Restaurant &amp; Cafe
                </p>
              </div>
            </div>

            <p className="text-sm text-garden-200/90 leading-relaxed">
              A serene open-air botanical dining oasis in Shivajinagar, Pune. Fresh continental flavors, artisanal pizzas, pastas, handcrafted coffees, and delightful garden vibes.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={restaurantInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-garden-900 border border-garden-800 hover:border-terracotta-500 hover:bg-garden-800 flex items-center justify-center text-cream-100 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={restaurantInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-garden-900 border border-garden-800 hover:border-emerald-500 hover:bg-garden-800 flex items-center justify-center text-cream-100 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={restaurantInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-garden-900 border border-garden-800 hover:border-terracotta-500 hover:bg-garden-800 flex items-center justify-center text-cream-100 transition-colors"
                aria-label="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-cream-50 tracking-wide border-l-2 border-terracotta-500 pl-3">
              Quick Exploration
            </h4>
            <ul className="space-y-2.5 text-sm text-garden-200">
              <li>
                <Link to="/" className="hover:text-cream-50 hover:underline flex items-center space-x-1.5 transition-colors">
                  <span>Home &amp; Highlights</span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-cream-50 hover:underline flex items-center space-x-1.5 transition-colors">
                  <span>Full Garden Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-cream-50 hover:underline flex items-center space-x-1.5 transition-colors">
                  <span>Location &amp; Directions</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cream-50 hover:underline flex items-center space-x-1.5 transition-colors">
                  <span>Table Reservations</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cream-50 hover:underline flex items-center space-x-1.5 transition-colors">
                  <span>Your Order Cart</span>
                </Link>
              </li>
              <li>
                <Link to="/owner-dashboard" className="text-terracotta-400 hover:text-terracotta-300 flex items-center space-x-1.5 font-medium transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Owner Portal (Demo)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timing */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-cream-50 tracking-wide border-l-2 border-terracotta-500 pl-3">
              Operating Hours
            </h4>
            <ul className="space-y-2 text-xs text-garden-200">
              <li className="flex justify-between py-1 border-b border-garden-800/60">
                <span className="text-cream-200">Monday – Thursday</span>
                <span className="font-medium text-cream-100">10:00 AM – 11:00 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-garden-800/60">
                <span className="text-cream-200 font-medium">Friday &amp; Saturday</span>
                <span className="font-medium text-terracotta-300">10:00 AM – 11:30 PM</span>
              </li>
              <li className="flex justify-between py-1 border-b border-garden-800/60">
                <span className="text-cream-200">Sunday</span>
                <span className="font-medium text-cream-100">10:00 AM – 11:00 PM</span>
              </li>
            </ul>
            <p className="text-[11px] text-garden-400">
              * Kitchen takes last dine-in orders 30 minutes before closing.
            </p>
          </div>

          {/* Col 4: Contact & Visit */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-cream-50 tracking-wide border-l-2 border-terracotta-500 pl-3">
              Visit Us in Pune
            </h4>
            <div className="space-y-3 text-xs text-garden-200">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <span>
                  1201/A/4, G.H. Patil Path, Near Kaysons Automobiles, Shivajinagar, Pune, Maharashtra 411004
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-terracotta-400 shrink-0" />
                <a href={`tel:${restaurantInfo.phoneRaw}`} className="hover:text-cream-50 transition-colors">
                  {restaurantInfo.phone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-terracotta-400 shrink-0" />
                <span className="text-garden-300">
                  {restaurantInfo.displayEmail} <span className="text-[10px] text-terracotta-400">(placeholder)</span>
                </span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href={restaurantInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-2 bg-garden-800 hover:bg-garden-700 text-cream-50 rounded-xl text-xs font-medium transition-colors"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-terracotta-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom micro note & Demo badge */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-garden-300 gap-4">
          <div className="flex items-center space-x-2">
            <span className="inline-block px-2.5 py-0.5 bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/30 rounded-md font-semibold text-[11px]">
              DEMO WEBSITE
            </span>
            <span>Created for Savannah, The garden restaurant and cafe • All data editable in <code>src/data/restaurant.js</code></span>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/owner-login" className="hover:text-cream-100 underline transition-colors">
              Owner Sign-In
            </Link>
            <span>•</span>
            <span>Pune, Maharashtra, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
