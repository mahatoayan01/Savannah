import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  MessageCircle, 
  Clock, 
  Car, 
  Bus, 
  Info, 
  ExternalLink,
  Compass
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';
import { getOpenStatus } from '../utils/hours';

export default function Location() {
  const openStatus = getOpenStatus(restaurantInfo.operatingHours);

  // Plain Google Maps iframe URL built without any API keys
  const mapEmbedUrl = `https://maps.google.com/maps?q=Savannah%2C+The+garden+restaurant+and+cafe%2C+G.H.+Patil+Path%2C+Shivajinagar%2C+Pune&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      
      {/* Header Banner */}
      <section className="bg-garden-950 text-cream-50 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-garden-800">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracotta-400 bg-garden-900 px-3.5 py-1 rounded-full border border-garden-800">
            <Compass className="w-3.5 h-3.5" />
            <span>Finding Savannah</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Location &amp; Visiting Us
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
            Conveniently situated in Shivajinagar, Pune, off G.H. Patil Path near the Deccan Gymkhana and FC Road dining quarter.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Top Split: Address Card & Action CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Address Details Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-sm space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracotta-600">
                <MapPin className="w-4 h-4 text-terracotta-500" />
                <span>Physical Address</span>
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-garden-950">
                {restaurantInfo.name}
              </h2>
              
              <p className="text-base text-charcoal-800 leading-relaxed">
                {restaurantInfo.address}
              </p>

              <div className="p-3 bg-cream-100 rounded-xl text-xs text-charcoal-700 space-y-1 border border-cream-200">
                <p><strong>Landmark:</strong> {restaurantInfo.landmark}</p>
                <p><strong>Area:</strong> Shivajinagar / Deccan Hub, Pune, Maharashtra</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={restaurantInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-garden-800 hover:bg-garden-900 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 shadow-sm transition-all"
              >
                <Navigation className="w-4 h-4 text-terracotta-400" />
                <span>Get Directions (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={`tel:${restaurantInfo.phoneRaw}`}
                className="px-5 py-3.5 bg-cream-100 hover:bg-cream-200 text-garden-900 rounded-xl text-sm font-semibold flex items-center space-x-2 border border-cream-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-terracotta-600" />
                <span>Call {restaurantInfo.phone}</span>
              </a>

              <a
                href={`https://wa.me/${restaurantInfo.whatsappRaw}?text=${encodeURIComponent("Hello Savannah, I need directions to reach your garden restaurant.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Parking & Commute Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cream-200 text-xs text-charcoal-700">
              <div className="flex items-start space-x-2.5">
                <Car className="w-4 h-4 text-garden-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-garden-900 block font-semibold">Parking Availability</strong>
                  <span>Two-wheeler parking easily available near the restaurant entrance. Limited street car parking during peak dinner hours.</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Bus className="w-4 h-4 text-garden-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-garden-900 block font-semibold">Transit &amp; Cabs</strong>
                  <span>Easily accessible by autos and cabs via FC Road, Deccan Gymkhana, and JM Road connectors.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Operating Hours Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-garden-800">
                <Clock className="w-4 h-4 text-garden-600" />
                <span>Weekly Hours</span>
              </div>
              <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                openStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                <span>{openStatus.statusText}</span>
              </span>
            </div>

            <div className="space-y-2">
              {restaurantInfo.operatingHours.map((sched) => {
                const isToday = sched.day.toLowerCase() === openStatus.currentDay.toLowerCase();
                return (
                  <div
                    key={sched.day}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm ${
                      isToday
                        ? 'bg-garden-800 text-white font-semibold'
                        : 'text-charcoal-800 hover:bg-cream-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{sched.day}</span>
                      {isToday && (
                        <span className="text-[10px] bg-terracotta-500 text-white px-2 py-0.5 rounded-md font-bold uppercase">
                          Today
                        </span>
                      )}
                    </div>
                    <span className={isToday ? 'text-cream-100 font-bold' : 'text-charcoal-700'}>
                      {sched.open} – {sched.close}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-charcoal-600 pt-2 border-t border-cream-200">
              * Note: For parties larger than 6 guests, reserving ahead on the Contact page is strongly recommended.
            </p>
          </div>

        </div>

        {/* Embedded Interactive Map Card */}
        <section className="bg-white rounded-3xl p-4 sm:p-6 border border-cream-300 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-garden-950">
                Interactive Google Map
              </h3>
              <p className="text-xs text-charcoal-700">
                G.H. Patil Path, Near Kaysons Automobiles, Shivajinagar, Pune
              </p>
            </div>

            <a
              href={restaurantInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 flex items-center space-x-1"
            >
              <span>View full map on Google &rarr;</span>
            </a>
          </div>

          {/* Iframe wrapper */}
          <div className="w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-cream-300 bg-cream-100 relative">
            <iframe
              title="Savannah Restaurant Google Maps Location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </section>

      </main>

    </div>
  );
}
