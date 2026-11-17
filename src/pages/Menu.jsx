import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Filter,
  Leaf,
  Info
} from 'lucide-react';
import { restaurantInfo, categories, menuItems } from '../data/restaurant';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const { cart, addToCart, updateQuantity, totalItems } = useCart();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'

  // Quantity selector state for individual item cards before adding
  const [quantities, setQuantities] = useState({});

  const getItemQty = (itemId) => quantities[itemId] || 1;

  const setItemQty = (itemId, qty) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, qty)
    }));
  };

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category match
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Dietary match
      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'veg' && item.isVeg) ||
        (dietaryFilter === 'non-veg' && !item.isVeg);

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  // Find if an item is already in the cart and get its quantity
  const getCartItemQty = (itemId) => {
    const found = cart.find(i => i.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      
      {/* Header Banner */}
      <section className="bg-garden-950 text-cream-50 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-garden-800">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-terracotta-400 bg-garden-900 px-3.5 py-1 rounded-full border border-garden-800">
            <Leaf className="w-3.5 h-3.5" />
            <span>Artisanal Kitchen &amp; Cafe</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Savannah Garden Menu
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
            Every dish is prepared fresh using wholesome ingredients, aromatic herbs, and authentic cooking techniques. All prices in Indian Rupees ({restaurantInfo.currency}) inclusive of applicable taxes.
          </p>
        </div>
      </section>

      {/* Sticky Filter & Category Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-cream-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
          
          {/* Top row: Search and Veg/Non-Veg Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-charcoal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pizzas, pastas, breakfast, coffee..."
                className="w-full pl-10 pr-9 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-garden-600 focus:bg-white transition-all text-charcoal-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-600 hover:text-charcoal-800"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons (Veg / Non-Veg) */}
            <div className="flex items-center space-x-1.5 self-start sm:self-auto bg-cream-100 p-1 rounded-xl border border-cream-300 text-xs font-semibold">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-white text-garden-900 shadow-xs'
                    : 'text-charcoal-700 hover:text-garden-900'
                }`}
              >
                All Items
              </button>
              
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                <span>Pure Veg</span>
              </button>

              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-300"></span>
                <span>Non-Veg</span>
              </button>
            </div>

          </div>

          {/* Bottom row: Scrollable Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-garden-800 text-white shadow-xs'
                    : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Results counter & Active filter note */}
        <div className="flex items-center justify-between text-xs text-charcoal-700 pb-2 border-b border-cream-200">
          <span>
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'dish' : 'dishes'}
            {searchQuery && ` for "${searchQuery}"`}
            {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
          </span>
          <span className="text-terracotta-600 font-medium">
            * All data editable in <code>src/data/restaurant.js</code>
          </span>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-cream-300 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-cream-100 text-garden-800 flex items-center justify-center mx-auto">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-garden-950">
              No dishes found
            </h3>
            <p className="text-xs text-charcoal-700">
              Try adjusting your search query or switching category / dietary filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setDietaryFilter('all');
              }}
              className="px-4 py-2 bg-garden-800 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const inCartQty = getCartItemQty(item.id);
            const selectedQty = getItemQty(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-cream-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative aspect-16/10 overflow-hidden bg-garden-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                        item.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                      {item.isPopular && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-sm">
                          Popular
                        </span>
                      )}
                      {item.isChefsSpecial && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-terracotta-500 text-white shadow-sm">
                          Chef's Special
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md">
                      {item.source}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-garden-950 group-hover:text-terracotta-600 transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-lg font-bold text-garden-900 shrink-0">
                        {restaurantInfo.currency}{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-charcoal-700 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer & Actions */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between gap-2">
                    
                    {/* Quantity controls */}
                    <div className="flex items-center space-x-1 bg-cream-100 rounded-xl p-1 border border-cream-200">
                      <button
                        onClick={() => setItemQty(item.id, selectedQty - 1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-cream-200 text-charcoal-800 flex items-center justify-center transition-colors disabled:opacity-40"
                        disabled={selectedQty <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-garden-950">
                        {selectedQty}
                      </span>
                      <button
                        onClick={() => setItemQty(item.id, selectedQty + 1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-cream-200 text-charcoal-800 flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Add to cart / In-cart Indicator */}
                    <div className="flex-1 flex justify-end">
                      {inCartQty > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => addToCart(item, selectedQty)}
                            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1 shadow-xs transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Add +{selectedQty} (In Cart: {inCartQty})</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, selectedQty)}
                          className="px-4 py-2 bg-garden-800 hover:bg-garden-900 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-colors active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </main>

      {/* Floating View Cart Bar if cart has items */}
      {totalItems > 0 && (
        <aside aria-label="Cart Overview" className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-30 animate-fadeIn">
          <Link
            to="/cart"
            className="w-full bg-garden-900 hover:bg-garden-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-garden-700 flex items-center justify-between transition-transform active:scale-98"
          >
            <div className="flex items-center space-x-2.5">
              <span className="bg-terracotta-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
              <span className="text-xs font-semibold">View Order Cart</span>
            </div>
            <span className="text-xs font-bold text-terracotta-300">
              Proceed to Checkout &rarr;
            </span>
          </Link>
        </aside>
      )}

    </div>
  );
}
