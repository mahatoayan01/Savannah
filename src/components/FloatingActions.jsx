import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';

export default function FloatingActions() {
  // Safe WhatsApp link builder
  const getWhatsAppLink = () => {
    try {
      const raw = (restaurantInfo.whatsappRaw || "").replace(/[^0-9]/g, '');
      const number = raw || "919172815777";
      const message = encodeURIComponent("Hello Savannah, I'd like to ask about dining at your garden cafe.");
      return `https://wa.me/${number}?text=${message}`;
    } catch (e) {
      return "https://wa.me/";
    }
  };

  const getPhoneLink = () => {
    try {
      const raw = restaurantInfo.phoneRaw || restaurantInfo.phone || "+919172815777";
      return `tel:${raw}`;
    } catch (e) {
      return "tel:+919172815777";
    }
  };

  return (
    <>
      {/* Floating WhatsApp Action (visible on all screens) */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-30 flex flex-col items-end space-y-3">
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-hidden focus:ring-3 focus:ring-emerald-400"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 shrink-0" />
          <span className="hidden sm:inline-block ml-2 text-xs font-semibold tracking-wide">
            WhatsApp Us
          </span>
        </a>
      </aside>

      {/* Mobile Sticky Action Bar at the bottom (Call Now + Menu) */}
      <div className="fixed bottom-0 left-0 right-0 z-20 md:hidden bg-white/95 backdrop-blur-md border-t border-cream-300 py-2.5 px-4 shadow-xl flex items-center justify-between gap-3">
        <a
          href={getPhoneLink()}
          className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-garden-800 text-white rounded-xl text-sm font-semibold active:bg-garden-900 transition-colors shadow-xs"
        >
          <Phone className="w-4 h-4 text-terracotta-400" />
          <span>Call Now</span>
        </a>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold active:bg-emerald-700 transition-colors shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
