import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  CalendarDays, 
  Send, 
  CheckCircle2, 
  Users, 
  Clock, 
  Sparkles,
  ExternalLink,
  Instagram,
  Facebook
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';
import { useCart } from '../context/CartContext';

export default function Contact() {
  const { addBooking } = useCart();

  // Table Booking Form State
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: '2',
    notes: '',
  });

  const [bookingErrors, setBookingErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // General Message Form State
  const [messageData, setMessageData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  // Validate and submit Table Booking
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!bookingData.name.trim()) errors.name = 'Full name is required';
    if (!bookingData.phone.trim()) errors.phone = 'Phone number is required';
    if (!bookingData.date) errors.date = 'Reservation date is required';
    if (!bookingData.time) errors.time = 'Time is required';
    if (!bookingData.guests || parseInt(bookingData.guests, 10) < 1) errors.guests = 'Please specify at least 1 guest';

    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      return;
    }

    setBookingErrors({});
    const newBooking = addBooking(bookingData);
    setConfirmedBooking(newBooking);
  };

  // Generate WhatsApp prefilled booking message
  const getWhatsAppBookingUrl = (booking) => {
    const rawNumber = (restaurantInfo.whatsappRaw || "").replace(/[^0-9]/g, '');
    const number = rawNumber || "919172815777";
    const text = `Hello Savannah! I would like to reserve a table:
• Booking ID: ${booking.id}
• Name: ${booking.name}
• Phone: ${booking.phone}
• Date: ${booking.date}
• Time: ${booking.time}
• Guests: ${booking.guests}
• Notes: ${booking.notes || "None"}
Please confirm my reservation. Thank you!`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  // Handle General Message Submit (Demo only)
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!messageData.name || !messageData.message) return;
    setMessageSubmitted(true);
    setTimeout(() => {
      setMessageData({ name: '', email: '', subject: '', message: '' });
      setMessageSubmitted(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      
      {/* Header Banner */}
      <section className="bg-garden-950 text-cream-50 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-garden-800">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracotta-400 bg-garden-900 px-3.5 py-1 rounded-full border border-garden-800">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Connect &amp; Reserve</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Contact &amp; Table Bookings
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
            Plan your visit to Savannah garden restaurant. Reserve your preferred outdoor or indoor table, chat with us on WhatsApp, or send us a message.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Quick Tap-Friendly Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Phone Button */}
          <a
            href={`tel:${restaurantInfo.phoneRaw}`}
            className="p-5 bg-white rounded-2xl border border-cream-300 shadow-xs hover:border-garden-600 hover:shadow-md transition-all flex items-center space-x-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-garden-100 group-hover:bg-garden-700 flex items-center justify-center text-garden-800 group-hover:text-white transition-colors shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-charcoal-600 tracking-wider">Call Restaurant</p>
              <p className="text-sm font-bold text-garden-950 mt-0.5">{restaurantInfo.phone}</p>
            </div>
          </a>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${restaurantInfo.whatsappRaw}?text=${encodeURIComponent("Hello Savannah, I'd like to ask a question.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-white rounded-2xl border border-cream-300 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all flex items-center space-x-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-600 flex items-center justify-center text-emerald-800 group-hover:text-white transition-colors shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-charcoal-600 tracking-wider">Chat on WhatsApp</p>
              <p className="text-sm font-bold text-emerald-900 mt-0.5">+91 91728 15777</p>
            </div>
          </a>

          {/* Email Button */}
          <a
            href={`mailto:${restaurantInfo.displayEmail}`}
            className="p-5 bg-white rounded-2xl border border-cream-300 shadow-xs hover:border-terracotta-500 hover:shadow-md transition-all flex items-center space-x-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-terracotta-100 group-hover:bg-terracotta-600 flex items-center justify-center text-terracotta-800 group-hover:text-white transition-colors shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs uppercase font-bold text-charcoal-600 tracking-wider">Email Inquiry</p>
              <p className="text-xs font-bold text-garden-950 mt-0.5 truncate">{restaurantInfo.displayEmail}</p>
              <span className="text-[10px] text-terracotta-600">[Placeholder]</span>
            </div>
          </a>

          {/* Google Maps Button */}
          <a
            href={restaurantInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-white rounded-2xl border border-cream-300 shadow-xs hover:border-garden-600 hover:shadow-md transition-all flex items-center space-x-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-amber-600 flex items-center justify-center text-amber-800 group-hover:text-white transition-colors shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-charcoal-600 tracking-wider">Google Maps</p>
              <p className="text-sm font-bold text-garden-950 mt-0.5">Shivajinagar, Pune</p>
            </div>
          </a>

        </div>

        {/* Main 2-Column: Table Booking Form + Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Table Booking Form (Col 1 - 7 cols) */}
          <section id="book" className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-lg space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-garden-800 bg-garden-100 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-garden-700" />
                <span>Reserve a Table</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-garden-950">
                Book your garden experience
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-700">
                Confirm your reservation online. Your booking will instantly sync to the Owner Dashboard, and you can also send it directly via WhatsApp.
              </p>
            </div>

            {/* Confirmed Booking Modal / Success Screen */}
            {confirmedBooking ? (
              <div className="bg-cream-100 rounded-2xl p-6 sm:p-8 border-2 border-garden-600 space-y-6 animate-fadeIn">
                <div className="flex items-center space-x-3 text-emerald-800">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="font-serif text-xl font-bold">Booking Request Received!</h3>
                    <p className="text-xs text-charcoal-700">Reference ID: <strong className="font-mono text-garden-950">{confirmedBooking.id}</strong></p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-cream-300 text-xs sm:text-sm space-y-2 text-charcoal-800">
                  <div className="flex justify-between py-1 border-b border-cream-200">
                    <span className="text-charcoal-600">Guest Name:</span>
                    <strong className="text-garden-950">{confirmedBooking.name}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-cream-200">
                    <span className="text-charcoal-600">Contact Phone:</span>
                    <strong>{confirmedBooking.phone}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-cream-200">
                    <span className="text-charcoal-600">Date &amp; Time:</span>
                    <strong>{confirmedBooking.date} at {confirmedBooking.time}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-cream-200">
                    <span className="text-charcoal-600">Party Size:</span>
                    <strong>{confirmedBooking.guests} Guests</strong>
                  </div>
                  {confirmedBooking.notes && (
                    <div className="py-1">
                      <span className="text-charcoal-600 block">Special Requests:</span>
                      <p className="italic text-charcoal-800 mt-0.5">{confirmedBooking.notes}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <a
                    href={getWhatsAppBookingUrl(confirmedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Booking on WhatsApp (Recommended)</span>
                  </a>

                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                      setBookingData({ name: '', phone: '', date: '', time: '19:30', guests: '2', notes: '' });
                    }}
                    className="w-full py-3 px-4 bg-white hover:bg-cream-200 text-garden-900 border border-cream-300 font-semibold rounded-xl text-xs transition-colors"
                  >
                    Reserve Another Table
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal-800 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      placeholder="e.g. Sneha Kulkarni"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-garden-600 ${
                        bookingErrors.name ? 'border-rose-400 bg-rose-50' : 'border-cream-300 bg-cream-50'
                      }`}
                    />
                    {bookingErrors.name && <p className="text-[11px] text-rose-600">{bookingErrors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal-800 block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      placeholder="e.g. +91 98220 12345"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-garden-600 ${
                        bookingErrors.phone ? 'border-rose-400 bg-rose-50' : 'border-cream-300 bg-cream-50'
                      }`}
                    />
                    {bookingErrors.phone && <p className="text-[11px] text-rose-600">{bookingErrors.phone}</p>}
                  </div>
                </div>

                {/* Date, Time, Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal-800 block">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 focus:ring-garden-600 ${
                        bookingErrors.date ? 'border-rose-400 bg-rose-50' : 'border-cream-300 bg-cream-50'
                      }`}
                    />
                    {bookingErrors.date && <p className="text-[11px] text-rose-600">{bookingErrors.date}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal-800 block">
                      Preferred Time *
                    </label>
                    <select
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-garden-600"
                    >
                      <option value="11:30">11:30 AM (Brunch)</option>
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="16:00">04:00 PM (Afternoon Tea/Cafe)</option>
                      <option value="17:30">05:30 PM (Evening Bites)</option>
                      <option value="19:00">07:00 PM (Early Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:00">08:00 PM (Peak Dinner)</option>
                      <option value="20:30">08:30 PM (Peak Dinner)</option>
                      <option value="21:15">09:15 PM (Late Dinner)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal-800 block">
                      No. of Guests *
                    </label>
                    <select
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-garden-600"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-800 block">
                    Special Requests / Seating Preference
                  </label>
                  <textarea
                    rows={3}
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    placeholder="e.g. Open-air garden table requested, anniversary celebration, high chair needed..."
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-hidden focus:ring-2 focus:ring-garden-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-garden-800 hover:bg-garden-900 text-white font-semibold rounded-2xl text-sm transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <CalendarDays className="w-4 h-4 text-terracotta-400" />
                  <span>Confirm Table Reservation</span>
                </button>
              </form>
            )}

          </section>

          {/* General Message Form & Socials (Col 2 - 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-sm space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-garden-950">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-charcoal-700">
                  Have feedback, a catering inquiry, or question? Send us a quick note below.
                </p>
              </div>

              {messageSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block font-semibold">Thank you for your message!</strong>
                    <span>Your inquiry has been received (Demo simulation).</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleMessageSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-800">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={messageData.name}
                      onChange={(e) => setMessageData({ ...messageData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-garden-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-800">Email Address</label>
                    <input
                      type="email"
                      value={messageData.email}
                      onChange={(e) => setMessageData({ ...messageData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-garden-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-800">Subject</label>
                    <input
                      type="text"
                      value={messageData.subject}
                      onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                      placeholder="e.g. Birthday Party Booking Inquiry"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-garden-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-charcoal-800">Message *</label>
                    <textarea
                      required
                      rows={3}
                      value={messageData.message}
                      onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
                      placeholder="How can we assist you today?"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-garden-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message (Demo)</span>
                  </button>
                </form>
              )}
            </section>

            {/* Social Channels Card */}
            <div className="bg-garden-950 text-cream-100 rounded-3xl p-6 sm:p-7 border border-garden-800 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">
                Social Channels &amp; Community
              </h3>
              <p className="text-xs text-garden-200 leading-relaxed font-light">
                Follow our official social media handles for seasonal chef specials, behind-the-scenes, and garden cafe stories.
              </p>

              <div className="space-y-2.5 pt-1 text-xs">
                <a
                  href={restaurantInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-garden-900 border border-garden-800 hover:border-terracotta-400 transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Instagram className="w-4 h-4 text-rose-400" />
                    <span>Instagram: {restaurantInfo.socialLinks.instagramHandle}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-garden-400" />
                </a>

                <a
                  href={restaurantInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-garden-900 border border-garden-800 hover:border-emerald-400 transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp: +91 91728 15777</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-garden-400" />
                </a>

                <a
                  href={restaurantInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-garden-900 border border-garden-800 hover:border-amber-400 transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Google Maps Verified Listing</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-garden-400" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
