import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Clock, 
  MapPin, 
  UtensilsCrossed,
  Package,
  Bike
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, tax, placeOrder } = useCart();

  // Order Details State
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' | 'takeaway' | 'delivery'
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    tableNo: 'Garden Table 2',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'Cash'
  
  // Fake card details state (Demo only, never logged or stored)
  const [fakeCard, setFakeCard] = useState({
    number: '4111 •••• •••• 4242',
    name: 'DEMO CUSTOMER',
    expiry: '12/28',
    cvv: '123'
  });
  const [fakeUpiId, setFakeUpiId] = useState('customer@okaxis');

  const [formErrors, setFormErrors] = useState({});
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery fee
  const deliveryFee = orderType === 'delivery' ? 40 : 0;
  const totalAmount = subtotal + tax + deliveryFee;

  // Handle Checkout submission
  const handleCheckout = (e) => {
    e.preventDefault();
    const errors = {};

    if (!customer.name.trim()) errors.name = 'Please provide your name';
    if (!customer.phone.trim()) errors.phone = 'Please provide a contact phone number';
    if (orderType === 'delivery' && !customer.address.trim()) {
      errors.address = 'Delivery address is required for doorstep delivery';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const orderPayload = {
        orderType,
        customer: {
          name: customer.name,
          phone: customer.phone,
          address: orderType === 'delivery' ? customer.address : (orderType === 'dine-in' ? `Table: ${customer.tableNo}` : 'Takeaway Counter')
        },
        tableNo: orderType === 'dine-in' ? customer.tableNo : 'N/A',
        items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
        amount: totalAmount,
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${fakeUpiId})` : (paymentMethod === 'Card' ? 'Card (Demo Visa)' : 'Cash on delivery / Counter'),
        paymentStatus: 'Paid',
      };

      const placed = placeOrder(orderPayload);
      setConfirmedOrder(placed);
      setIsSubmitting(false);
    }, 600);
  };

  // IF ORDER CONFIRMED: SHOW RECEIPT SCREEN
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-cream-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-xl space-y-8 animate-fadeIn">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
              Demo Order Placed Successfully
            </span>
            <h1 className="font-serif text-3xl font-bold text-garden-950">
              Thank you, {confirmedOrder.customer?.name}!
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-700">
              Your order has been recorded and transmitted to the kitchen.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-cream-100/70 rounded-2xl p-6 border border-cream-300 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-cream-300">
              <div>
                <span className="text-charcoal-600 text-xs block">Order Reference ID:</span>
                <span className="font-mono text-base font-bold text-garden-950">{confirmedOrder.id}</span>
              </div>
              <div className="text-right">
                <span className="text-charcoal-600 text-xs block">Order Placed At:</span>
                <span className="font-medium text-charcoal-800">{confirmedOrder.date}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2 border-b border-cream-300 text-xs">
              <div>
                <span className="text-charcoal-600 block">Order Type:</span>
                <strong className="uppercase text-garden-900">{confirmedOrder.orderType}</strong>
                {confirmedOrder.tableNo && confirmedOrder.tableNo !== 'N/A' && (
                  <span className="block text-charcoal-700">({confirmedOrder.tableNo})</span>
                )}
              </div>
              <div>
                <span className="text-charcoal-600 block">Payment Method:</span>
                <strong className="text-garden-900">{confirmedOrder.paymentMethod}</strong>
                <span className="block text-emerald-600 font-semibold">• Payment Settled</span>
              </div>
            </div>

            {/* Items summary */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-charcoal-800 block uppercase tracking-wider">
                Ordered Items:
              </span>
              <ul className="space-y-1.5">
                {confirmedOrder.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-xs text-charcoal-800">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-mono">{restaurantInfo.currency}{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-cream-300 flex justify-between items-baseline font-bold text-sm sm:text-base text-garden-950">
              <span>Total Paid:</span>
              <span className="font-mono text-xl text-terracotta-600">
                {restaurantInfo.currency}{confirmedOrder.amount}
              </span>
            </div>
          </div>

          {/* Kitchen note */}
          <div className="p-4 rounded-xl bg-garden-50 border border-garden-200 text-xs text-garden-900 flex items-center space-x-3">
            <Clock className="w-5 h-5 text-garden-700 shrink-0" />
            <div>
              <strong>Estimated Preparation Time: 20 – 30 minutes</strong>
              <p className="text-[11px] text-garden-700">The order is marked as <em>New</em> in the Owner Dashboard.</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/owner-dashboard"
              className="flex-1 py-3 px-4 bg-garden-800 hover:bg-garden-900 text-white font-semibold rounded-xl text-xs text-center transition-colors shadow-xs"
            >
              View Order in Owner Dashboard &rarr;
            </Link>

            <Link
              to="/menu"
              className="flex-1 py-3 px-4 bg-white hover:bg-cream-100 text-garden-900 border border-cream-300 font-semibold rounded-xl text-xs text-center transition-colors"
            >
              Order More Items
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // IF CART IS EMPTY
  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-cream-50 px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center border border-cream-300 shadow-sm space-y-6">
          <div className="w-20 h-20 rounded-full bg-cream-100 text-garden-800 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-garden-950">
              Your garden cart is empty
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-700">
              You haven't added any continental delicacies, pizzas, or drinks to your cart yet.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-garden-800 hover:bg-garden-900 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
          >
            <span>Explore Savannah Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      
      {/* Header Banner */}
      <section className="bg-garden-950 text-cream-50 pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-garden-800">
        <div className="max-w-7xl mx-auto text-center space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Review Order &amp; Checkout
          </h1>
          <p className="text-xs sm:text-sm text-cream-200/90 font-light">
            Review your dishes, select dining mode, and finalize your order.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-garden-700" />
                  <h2 className="font-serif text-xl font-bold text-garden-950">
                    Selected Items ({cart.length})
                  </h2>
                </div>
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-600 hover:text-rose-800 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-cream-200">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-garden-900 border border-cream-300"
                      />
                      <div className="min-w-0">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-garden-950 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-charcoal-700">
                          {restaurantInfo.currency}{item.price} each
                        </p>
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider ${
                          item.isVeg ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          {item.isVeg ? 'Pure Veg' : 'Non-Veg'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0">
                      {/* Qty edit */}
                      <div className="flex items-center space-x-1 bg-cream-100 rounded-xl p-1 border border-cream-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-cream-200 text-charcoal-800 flex items-center justify-center transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-garden-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-cream-200 text-charcoal-800 flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm sm:text-base font-bold text-garden-900 w-16 text-right">
                        {restaurantInfo.currency}{item.price * item.quantity}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal-600 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/menu"
                  className="text-xs font-semibold text-garden-800 hover:underline flex items-center space-x-1"
                >
                  <span>&larr; Add more dishes from menu</span>
                </Link>
              </div>

            </div>

          </div>

          {/* Right Column: Order Type, Customer Details & Demo Payment (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <form onSubmit={handleCheckout} className="space-y-6">
              
              {/* Order Mode Selector Card */}
              <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-garden-950">
                  Select Dining Mode
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      orderType === 'dine-in'
                        ? 'border-garden-700 bg-garden-50 text-garden-950 font-bold shadow-xs'
                        : 'border-cream-300 hover:bg-cream-50 text-charcoal-700 text-xs font-medium'
                    }`}
                  >
                    <UtensilsCrossed className="w-5 h-5 mx-auto mb-1 text-garden-700" />
                    <span className="text-xs block">Dine-in</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      orderType === 'takeaway'
                        ? 'border-garden-700 bg-garden-50 text-garden-950 font-bold shadow-xs'
                        : 'border-cream-300 hover:bg-cream-50 text-charcoal-700 text-xs font-medium'
                    }`}
                  >
                    <Package className="w-5 h-5 mx-auto mb-1 text-garden-700" />
                    <span className="text-xs block">Takeaway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      orderType === 'delivery'
                        ? 'border-garden-700 bg-garden-50 text-garden-950 font-bold shadow-xs'
                        : 'border-cream-300 hover:bg-cream-50 text-charcoal-700 text-xs font-medium'
                    }`}
                  >
                    <Bike className="w-5 h-5 mx-auto mb-1 text-garden-700" />
                    <span className="text-xs block">Delivery</span>
                  </button>
                </div>

                {orderType === 'dine-in' && (
                  <div className="p-3 bg-cream-100 rounded-xl space-y-1">
                    <label className="text-[11px] font-bold text-charcoal-800 block">Table Selection</label>
                    <select
                      value={customer.tableNo}
                      onChange={(e) => setCustomer({ ...customer, tableNo: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-white"
                    >
                      <option value="Garden Table 1">Garden Table 1 (Courtyard)</option>
                      <option value="Garden Table 2">Garden Table 2 (Under Foliage)</option>
                      <option value="Garden Table 4">Garden Table 4 (Fairy Light Nook)</option>
                      <option value="Indoor Cafe Nook 1">Indoor Cafe Nook 1 (AC)</option>
                      <option value="Indoor Cafe Nook 3">Indoor Cafe Nook 3 (AC)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Customer Information Card */}
              <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-garden-950">
                  Customer Details
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-charcoal-800 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      placeholder="e.g. Sneha Patil"
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-garden-600 ${
                        formErrors.name ? 'border-rose-400 bg-rose-50' : 'border-cream-300 bg-cream-50'
                      }`}
                    />
                    {formErrors.name && <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-charcoal-800 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="e.g. +91 98220 98765"
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-garden-600 ${
                        formErrors.phone ? 'border-rose-400 bg-rose-50' : 'border-cream-300 bg-cream-50'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.phone}</p>}
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="text-xs font-bold text-charcoal-800 block mb-1">
                        Delivery Address in Pune *
                      </label>
                      <textarea
                        rows={2}
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        placeholder="House/flat no., street, landmark in Shivajinagar/Erandwane..."
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-garden-600 ${
                          formErrors.address ? 'border-rose-400 bg-rose-50' : 'border-cream-300 bg-cream-50'
                        }`}
                      />
                      {formErrors.address && <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.address}</p>}
                    </div>
                  )}
                </div>
              </div>

              {/* DEMO PAYMENT CARD */}
              <div className="bg-white rounded-3xl p-6 border-2 border-terracotta-400/80 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-garden-950">
                    Payment Method
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-terracotta-100 text-terracotta-800 px-2 py-0.5 rounded-md">
                    Simulation Only
                  </span>
                </div>

                {/* Prominent Demo Notice Banner as required */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 flex items-start space-x-2.5 text-xs text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Demo payment simulation only.</strong>
                    <p className="text-[11px] text-amber-800">
                      No real money will be charged. Never enter real credit card credentials anywhere on demo sites.
                    </p>
                  </div>
                </div>

                {/* Method Choices */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-garden-800 bg-garden-50 text-garden-950 font-bold'
                        : 'border-cream-300 text-charcoal-700 text-xs'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span className="text-xs block">UPI App</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-garden-800 bg-garden-50 text-garden-950 font-bold'
                        : 'border-cream-300 text-charcoal-700 text-xs'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-terracotta-600" />
                    <span className="text-xs block">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'Cash'
                        ? 'border-garden-800 bg-garden-50 text-garden-950 font-bold'
                        : 'border-cream-300 text-charcoal-700 text-xs'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mx-auto mb-1 text-garden-700" />
                    <span className="text-xs block">Cash</span>
                  </button>
                </div>

                {/* Fake Method Inputs */}
                {paymentMethod === 'UPI' && (
                  <div className="p-3 bg-cream-50 rounded-xl space-y-1.5 border border-cream-200">
                    <label className="text-[11px] font-bold text-charcoal-800 block">Fake Virtual Payment Address (VPA)</label>
                    <input
                      type="text"
                      value={fakeUpiId}
                      onChange={(e) => setFakeUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi"
                      className="w-full px-3 py-1.5 rounded-lg border border-cream-300 text-xs bg-white"
                    />
                    <p className="text-[10px] text-charcoal-600">Supports simulated Google Pay, PhonePe, Paytm approval.</p>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="p-3 bg-cream-50 rounded-xl space-y-2 border border-cream-200 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-charcoal-800 block">Card Number (Demo Fake)</label>
                      <input
                        type="text"
                        readOnly
                        value={fakeCard.number}
                        className="w-full px-3 py-1.5 rounded-lg border border-cream-300 bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-charcoal-800 block">Expiry</label>
                        <input
                          type="text"
                          readOnly
                          value={fakeCard.expiry}
                          className="w-full px-3 py-1.5 rounded-lg border border-cream-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-charcoal-800 block">CVV</label>
                        <input
                          type="text"
                          readOnly
                          value={fakeCard.cvv}
                          className="w-full px-3 py-1.5 rounded-lg border border-cream-300 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Cash' && (
                  <p className="text-xs text-charcoal-700 italic p-2 bg-cream-100 rounded-lg">
                    Pay with cash at the table or to the delivery partner upon arrival.
                  </p>
                )}

              </div>

              {/* Order Summary Breakdown Card */}
              <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-sm space-y-3 text-xs sm:text-sm">
                <h3 className="font-serif text-lg font-bold text-garden-950 pb-2 border-b border-cream-200">
                  Payment Summary
                </h3>

                <div className="flex justify-between text-charcoal-700">
                  <span>Subtotal:</span>
                  <span className="font-mono">{restaurantInfo.currency}{subtotal}</span>
                </div>

                <div className="flex justify-between text-charcoal-700">
                  <span>GST (5%):</span>
                  <span className="font-mono">{restaurantInfo.currency}{tax}</span>
                </div>

                {orderType === 'delivery' && (
                  <div className="flex justify-between text-charcoal-700">
                    <span>Doorstep Delivery:</span>
                    <span className="font-mono">{restaurantInfo.currency}{deliveryFee}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-cream-300 flex justify-between items-baseline font-bold text-base text-garden-950">
                  <span>Total Amount:</span>
                  <span className="font-mono text-xl text-terracotta-600">
                    {restaurantInfo.currency}{totalAmount}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-2xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'Processing Demo Order...' : `Place Demo Order (${restaurantInfo.currency}${totalAmount})`}</span>
                </button>
              </div>

            </form>

          </div>

        </div>
      </main>

    </div>
  );
}
