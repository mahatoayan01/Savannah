import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CalendarDays, 
  Phone, 
  MessageCircle, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  Plus, 
  ExternalLink, 
  Instagram, 
  ShieldCheck,
  UtensilsCrossed,
  Tag
} from 'lucide-react';
import { 
  restaurantInfo, 
  menuItems, 
  offers, 
  reviews, 
  gallery, 
  instagramPosts, 
  faqs 
} from '../data/restaurant';
import { useCart } from '../context/CartContext';
import { getOpenStatus } from '../utils/hours';
import Lightbox from '../components/Lightbox';

export default function Home() {
  const { addToCart } = useCart();
  const openStatus = getOpenStatus(restaurantInfo.operatingHours);

  // Lightbox state for gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);

  // Accordion state for FAQs
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Quick feedback when adding popular dish to cart
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  const handleAddPopularItem = (dish) => {
    addToCart(dish, 1);
    setAddedItemNotice(dish.name);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2500);
  };

  const popularDishes = menuItems.filter(item => item.isPopular).slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-garden-950 text-cream-50 pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background artwork & gradient overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-garden.svg"
            alt="Savannah Garden Ambiance"
            className="w-full h-full object-cover opacity-25 filter blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-garden-950 via-garden-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-garden-950 via-transparent to-garden-950/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          
          {/* Garden Live Status Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium tracking-wide">
            <span className={`w-2.5 h-2.5 rounded-full ${openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
            <span className="text-white font-semibold">{openStatus.statusText}</span>
            <span className="text-cream-200/80">({openStatus.subText})</span>
            <span className="text-cream-300">•</span>
            <span className="text-terracotta-400 font-semibold">Shivajinagar, Pune</span>
          </div>

          {/* Restaurant Title & Tagline */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              Savannah
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-terracotta-300 font-normal">
              The garden restaurant and cafe
            </p>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-cream-200/90 leading-relaxed font-light">
              Experience the tranquility of open-air garden dining surrounded by lush greenery. Handcrafted artisanal pizzas, creamy pastas, chef-curated continental delights, and refreshing coffees.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link
              to="/menu"
              className="px-7 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 group"
            >
              <span>Explore Menu &amp; Order</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="px-6 py-4 bg-garden-800/90 hover:bg-garden-800 text-cream-100 border border-garden-700/80 hover:border-garden-600 font-semibold rounded-2xl transition-all duration-200 flex items-center space-x-2"
            >
              <CalendarDays className="w-4 h-4 text-terracotta-400" />
              <span>Book a Table</span>
            </Link>

            <a
              href={`https://wa.me/${restaurantInfo.whatsappRaw}?text=${encodeURIComponent("Hello Savannah, I'd like to ask about dining at your garden restaurant.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-4 bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all duration-200 flex items-center space-x-2"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Ratings Snippet */}
          <div className="pt-6 flex items-center justify-center space-x-6 text-xs sm:text-sm text-cream-200">
            <div className="flex items-center space-x-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white text-base ml-1">{restaurantInfo.rating}</span>
              <span className="text-cream-300">({restaurantInfo.reviewCount}+ Google reviews)</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <span className="text-terracotta-300 font-semibold">{restaurantInfo.priceRange}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Added to cart toast */}
      {addedItemNotice && (
        <div className="fixed top-24 right-4 z-50 bg-garden-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-garden-700 flex items-center space-x-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-semibold">{addedItemNotice} added to cart!</p>
            <Link to="/cart" className="text-[11px] text-terracotta-300 underline font-medium">View Cart &rarr;</Link>
          </div>
        </div>
      )}

      {/* 2. ABOUT THE RESTAURANT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracotta-600 bg-terracotta-50 px-3.5 py-1.5 rounded-full border border-terracotta-200">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Pune's Lush Dining Retreat</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-garden-950 tracking-tight leading-snug">
              A serene garden escape in the heart of Shivajinagar
            </h2>

            <p className="text-charcoal-700 text-base sm:text-lg leading-relaxed">
              Situated off G.H. Patil Path near the buzzing Deccan and FC Road hub, <strong className="text-garden-900">Savannah, The garden restaurant and cafe</strong> offers a rare, calm oasis amidst Pune's city energy. Our open-air garden terrace is enveloped by lush potted plants, shaded canopies, and romantic fairy lights in the evening.
            </p>

            <p className="text-charcoal-700 text-base leading-relaxed">
              Whether you are stopping by for a comforting cup of slow-brewed cold brew, tucking into our chef's signature <em>Pesto Chicken Roulade</em>, or sharing wood-fired style pizzas with friends under the stars, Savannah provides a warm and hospitable sanctuary for every occasion.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cream-200 text-sm">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-garden-600 shrink-0 mt-0.5" />
                <span className="font-medium text-charcoal-800">Tranquil Garden &amp; Indoor AC Seating</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-garden-600 shrink-0 mt-0.5" />
                <span className="font-medium text-charcoal-800">Fresh Continental &amp; Italian Recipes</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-garden-600 shrink-0 mt-0.5" />
                <span className="font-medium text-charcoal-800">Pet-Friendly Outdoor Dining Zone</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-garden-600 shrink-0 mt-0.5" />
                <span className="font-medium text-charcoal-800">Dedicated Celebration Tables</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/location"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-garden-800 hover:text-garden-600 group"
              >
                <span>Find our location on G.H. Patil Path</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-garden-900 aspect-4/3 group">
              <img
                src="/images/about-garden.svg"
                alt="Savannah Garden Courtyard Ambiance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white">
                  <span className="text-xs uppercase tracking-widest text-terracotta-400 font-bold">Ambience &amp; Nature</span>
                  <h3 className="font-serif text-2xl font-bold mt-1">Peaceful greenery tucked in Pune</h3>
                  <p className="text-xs text-cream-200/90 mt-1">Open 10:00 AM – 11:00 PM every day for lunch, cafe hours &amp; dinner</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-cream-200 hidden sm:flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-garden-100 flex items-center justify-center text-garden-800">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-charcoal-600 uppercase font-bold tracking-wider">Average Price</p>
                <p className="text-lg font-serif font-bold text-garden-950">₹800 – ₹1000 for two</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POPULAR DISHES SECTION */}
      <section className="bg-cream-100/70 py-20 border-y border-cream-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-garden-800 bg-garden-100 px-3.5 py-1.5 rounded-full">
                <span>Diner Favorites</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-garden-950">
                Most loved from our garden kitchen
              </h2>
              <p className="text-charcoal-700 text-sm sm:text-base max-w-xl">
                Authentic recipes crafted with fresh ingredients and served fresh to your garden table.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-terracotta-600 hover:text-terracotta-700 group"
            >
              <span>View complete menu ({menuItems.length} items)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl overflow-hidden border border-cream-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-garden-950">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                      dish.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}>
                      {dish.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                    {dish.isChefsSpecial && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-white shadow-sm">
                        Chef's Special
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-lg font-bold text-garden-950 group-hover:text-terracotta-600 transition-colors">
                        {dish.name}
                      </h3>
                      <span className="text-base font-bold text-garden-900 ml-2">
                        {restaurantInfo.currency}{dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-cream-200">
                    <span className="text-[11px] text-garden-600 font-medium">
                      {dish.source}
                    </span>
                    <button
                      onClick={() => handleAddPopularItem(dish)}
                      className="px-3.5 py-2 bg-garden-800 hover:bg-garden-900 text-white text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1 shadow-xs active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. OFFERS & SPECIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-terracotta-600 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
              <Tag className="w-3.5 h-3.5" />
              <span>Current Specials</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-garden-950">
              Special dining perks &amp; deals
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-700 max-w-lg mx-auto">
              Sample promotional specials for Savannah. Edit or update these in <code>src/data/restaurant.js</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-terracotta-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-terracotta-400 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-terracotta-100 text-terracotta-800 font-bold text-xs rounded-full uppercase tracking-wider">
                      {offer.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-garden-800 bg-cream-200 px-2.5 py-1 rounded-lg">
                      {offer.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-garden-950 mb-1">
                      {offer.discount}
                    </h3>
                    <h4 className="text-base font-semibold text-charcoal-900 mb-2">
                      {offer.title}
                    </h4>
                    <p className="text-xs text-charcoal-700 leading-relaxed">
                      {offer.condition}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between">
                  <span className="text-[11px] text-terracotta-600 italic font-medium">
                    {offer.label}
                  </span>
                  <Link
                    to="/menu"
                    className="text-xs font-bold text-garden-800 hover:text-garden-600 flex items-center space-x-1"
                  >
                    <span>Claim in Menu &rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALLERY SECTION (WITH INTERACTIVE LIGHTBOX) */}
      <section className="bg-garden-950 text-cream-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracotta-400 bg-garden-900 px-3.5 py-1.5 rounded-full border border-garden-800">
                <span>Visual Ambiance</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
                Glimpses of Savannah
              </h2>
              <p className="text-garden-200 text-sm max-w-xl">
                Explore our lush courtyard, fairy lights, barista station, and culinary craftsmanship. Click any image to open the full lightbox viewer.
              </p>
            </div>

            <div className="text-xs text-garden-300">
              Click any photo to enlarge
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {gallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setCurrentGalleryIdx(idx);
                  setLightboxOpen(true);
                }}
                className="group relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-garden-900 border border-garden-800 shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-garden-950/90 via-garden-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 flex flex-col justify-end">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta-400">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-garden-200 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={gallery}
        currentIndex={currentGalleryIdx}
        onIndexChange={setCurrentGalleryIdx}
      />

      {/* 6. OPENING HOURS WITH LIVE INDICATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-garden-800 bg-garden-50 px-3.5 py-1.5 rounded-full border border-garden-200">
                <Clock className="w-3.5 h-3.5 text-garden-600" />
                <span>Weekly Schedule</span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-garden-950">
                Hours of hospitality
              </h2>

              <p className="text-charcoal-700 text-sm leading-relaxed">
                We welcome diners for breakfast, relaxing afternoon coffees, family lunches, and late night garden dinners throughout the week.
              </p>

              {/* Live indicator card */}
              <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                  <span className="font-bold text-garden-950 text-base">{openStatus.statusText}</span>
                  <span className="text-xs text-charcoal-700">({openStatus.currentDay})</span>
                </div>
                <p className="text-xs text-charcoal-700">
                  Today's Hours: <strong className="text-garden-900">{openStatus.hoursToday}</strong> • {openStatus.subText}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 px-5 py-3 bg-garden-800 hover:bg-garden-900 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
                >
                  <CalendarDays className="w-4 h-4 text-terracotta-400" />
                  <span>Reserve Table Ahead</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-cream-50 rounded-2xl p-6 border border-cream-200">
              <div className="space-y-2.5">
                {restaurantInfo.operatingHours.map((sched) => {
                  const isToday = sched.day.toLowerCase() === openStatus.currentDay.toLowerCase();
                  return (
                    <div
                      key={sched.day}
                      className={`flex items-center justify-between p-3 rounded-xl text-sm transition-colors ${
                        isToday
                          ? 'bg-garden-800 text-white font-semibold shadow-xs'
                          : 'text-charcoal-800 hover:bg-cream-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{sched.day}</span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-wider">
                            Today
                          </span>
                        )}
                      </div>
                      <span className={isToday ? 'text-cream-100' : 'text-charcoal-700 font-medium'}>
                        {sched.open} – {sched.close}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. REAL CUSTOMER REVIEWS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-garden-800 bg-garden-100 px-3.5 py-1.5 rounded-full">
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-garden-950">
              Real reviews from Google Maps
            </h2>
            <p className="text-charcoal-700 text-sm max-w-xl">
              Authentic dining impressions shared by patrons who visited Savannah in Shivajinagar, Pune.
            </p>
          </div>

          {/* Rating box */}
          <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-cream-300 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-serif text-2xl font-bold">
              {restaurantInfo.rating}
            </div>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-charcoal-700 font-medium mt-0.5">
                Over {restaurantInfo.reviewCount} customer reviews
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-charcoal-600">{rev.date}</span>
                </div>

                <p className="text-charcoal-800 text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-garden-950 text-sm">
                    {rev.author}
                  </h4>
                  <span className="text-[11px] text-garden-700 font-medium">
                    {rev.source}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-garden-100 flex items-center justify-center text-garden-800 text-xs font-bold">
                  {rev.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <a
            href={restaurantInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-garden-50 hover:bg-garden-100 text-garden-900 border border-garden-300 font-semibold rounded-2xl text-sm transition-colors shadow-xs"
          >
            <span>See all 380+ reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4 text-terracotta-500" />
          </a>
        </div>
      </section>

      {/* 8. INSTAGRAM POSTS SECTION */}
      <section className="bg-cream-100/60 py-20 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram Feed</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-garden-950">
                Moments @savannah_pune
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-700">
                Tag us during your visit for a chance to be featured on our garden wall.
              </p>
            </div>

            <a
              href={restaurantInfo.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow us on Instagram</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden bg-garden-950 shadow-xs block"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-garden-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-white text-xs">
                  <div className="flex items-center justify-between text-[10px] text-terracotta-300">
                    <span>{post.handle}</span>
                    <Instagram className="w-3 h-3" />
                  </div>
                  <p className="text-[11px] line-clamp-3 leading-tight font-light">
                    {post.caption}
                  </p>
                  <div className="text-[10px] text-cream-200 font-medium">
                    ♥ {post.likes} likes
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-garden-800 bg-garden-100 px-3 py-1 rounded-full">
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-garden-950">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-700">
            Everything you need to know about visiting Savannah garden restaurant &amp; cafe.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-cream-300 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between font-serif font-bold text-base sm:text-lg text-garden-950 hover:text-garden-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-terracotta-500 shrink-0 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-charcoal-700 leading-relaxed border-t border-cream-200 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. SOCIAL LINKS & FINAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-garden-900 to-garden-950 text-cream-50 rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-xl border border-garden-800">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Ready to dine amidst nature?
            </h2>
            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
              We look forward to hosting you at Savannah. Reserve your table or order your favorite continental and cafe dishes for pickup or delivery.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/menu"
                className="px-6 py-3.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
              >
                Explore Full Menu
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl text-sm transition-colors"
              >
                Book a Garden Table
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
