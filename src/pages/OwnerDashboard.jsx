import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LogOut, 
  Search, 
  Filter, 
  ShoppingBag, 
  DollarSign, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Phone, 
  MapPin, 
  ArrowUpDown,
  CreditCard,
  RefreshCw,
  Sparkles,
  Utensils
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';
import { useCart } from '../context/CartContext';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { orders, payments, bookings, updateOrderStatus, updateBookingStatus } = useCart();

  // Authentication check
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const auth = sessionStorage.getItem('savannah_owner_auth');
      if (auth !== 'true') {
        navigate('/owner-login');
      } else {
        setIsAuthenticated(true);
      }
    } catch (e) {
      navigate('/owner-login');
    }
  }, [navigate]);

  // Tab State: 'orders' | 'payments' | 'bookings'
  const [activeTab, setActiveTab] = useState('orders');

  // Filter & Search states
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Logout
  const handleLogout = () => {
    try {
      sessionStorage.removeItem('savannah_owner_auth');
    } catch (e) {
      console.warn(e);
    }
    navigate('/owner-login');
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  // Summary Metrics calculations
  const totalOrdersCount = orders.length;
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.amount || 0), 0);
  const pendingOrdersCount = orders.filter(
    o => o.status === 'New' || o.status === 'Preparing' || o.status === 'Ready'
  ).length;
  
  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().substring(0, 10);
  const todaysOrdersCount = orders.filter(o => o.date && o.date.startsWith(todayStr)).length;

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      (order.customer?.name || '').toLowerCase().includes(q) ||
      (order.customer?.phone || '').includes(q) ||
      order.items.some(i => i.name.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  // Filtered Payments
  const filteredPayments = payments.filter(payment => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      payment.id.toLowerCase().includes(q) ||
      payment.orderId.toLowerCase().includes(q) ||
      (payment.customerName || '').toLowerCase().includes(q) ||
      payment.method.toLowerCase().includes(q)
    );
  });

  // Filtered Bookings
  const filteredBookings = bookings.filter(booking => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      booking.id.toLowerCase().includes(q) ||
      booking.name.toLowerCase().includes(q) ||
      booking.phone.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-cream-100/60 pb-24">
      
      {/* Top Owner Header */}
      <div className="bg-garden-950 text-cream-100 py-6 px-4 sm:px-6 lg:px-8 border-b border-garden-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-garden-800 flex items-center justify-center text-white border border-garden-700">
              <ShieldCheck className="w-5 h-5 text-terracotta-400" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Savannah Owner Dashboard
              </h1>
              <p className="text-xs text-garden-300">
                Live Kitchen, Order Status &amp; Bookings Management • Pune
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-cream-200/80 bg-garden-900 px-3 py-1.5 rounded-lg border border-garden-800">
              Logged in as: <strong>{restaurantInfo.ownerCredentials.username}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 bg-rose-700/80 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Revenue */}
          <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-charcoal-600 font-bold uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl font-serif font-bold text-garden-950 mt-0.5">
                {restaurantInfo.currency}{totalRevenue.toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-emerald-700 font-medium">Excl. cancelled orders</span>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-garden-100 text-garden-800 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-charcoal-600 font-bold uppercase tracking-wider">Total Orders</p>
              <p className="text-2xl font-serif font-bold text-garden-950 mt-0.5">
                {totalOrdersCount}
              </p>
              <span className="text-[10px] text-garden-700 font-medium">Merged with live orders</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-charcoal-600 font-bold uppercase tracking-wider">Pending Orders</p>
              <p className="text-2xl font-serif font-bold text-garden-950 mt-0.5">
                {pendingOrdersCount}
              </p>
              <span className="text-[10px] text-amber-700 font-medium">New, Preparing, or Ready</span>
            </div>
          </div>

          {/* Today's Orders */}
          <div className="bg-white p-5 rounded-2xl border border-cream-300 shadow-xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-charcoal-600 font-bold uppercase tracking-wider">Today's Orders</p>
              <p className="text-2xl font-serif font-bold text-garden-950 mt-0.5">
                {todaysOrdersCount}
              </p>
              <span className="text-[10px] text-terracotta-700 font-medium">{todayStr}</span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-300 pb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-garden-800 text-white shadow-xs'
                  : 'bg-white text-charcoal-700 hover:bg-cream-200 border border-cream-300'
              }`}
            >
              Live Orders &amp; Kitchen ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'payments'
                  ? 'bg-garden-800 text-white shadow-xs'
                  : 'bg-white text-charcoal-700 hover:bg-cream-200 border border-cream-300'
              }`}
            >
              Payment History ({payments.length})
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-garden-800 text-white shadow-xs'
                  : 'bg-white text-charcoal-700 hover:bg-cream-200 border border-cream-300'
              }`}
            >
              Table Reservations ({bookings.length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-charcoal-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name, dish..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-cream-300 bg-white text-xs focus:ring-2 focus:ring-garden-600"
            />
          </div>
        </div>

        {/* TAB 1: ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Status Filter Row */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-charcoal-600 font-bold uppercase tracking-wider mr-1">Filter by Status:</span>
              {['all', 'New', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    statusFilter.toLowerCase() === st.toLowerCase()
                      ? 'bg-garden-800 text-white'
                      : 'bg-white text-charcoal-700 hover:bg-cream-200 border border-cream-300'
                  }`}
                >
                  {st === 'all' ? 'All Orders' : st}
                </button>
              ))}
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl border border-cream-300 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-cream-100/80 border-b border-cream-300 text-charcoal-700 font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Order ID &amp; Source</th>
                      <th className="py-3.5 px-4">Date &amp; Time</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Type / Table</th>
                      <th className="py-3.5 px-4">Items Summary</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Status &amp; Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-10 text-center text-charcoal-600">
                          No orders match the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-cream-50/80 transition-colors">
                          
                          {/* Order ID & Source badge */}
                          <td className="py-3 px-4 font-mono font-bold text-garden-950">
                            <div>{order.id}</div>
                            {order.isSample ? (
                              <span className="text-[10px] font-sans font-normal text-charcoal-700 bg-cream-200 px-1.5 py-0.5 rounded-sm">
                                Sample Data
                              </span>
                            ) : (
                              <span className="text-[10px] font-sans font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-sm animate-pulse">
                                Live Demo Order
                              </span>
                            )}
                          </td>

                          {/* Date */}
                          <td className="py-3 px-4 text-charcoal-700 whitespace-nowrap">
                            {order.date}
                          </td>

                          {/* Customer */}
                          <td className="py-3 px-4">
                            <strong className="text-garden-950 block">{order.customer?.name}</strong>
                            <span className="text-[11px] text-charcoal-600 block">{order.customer?.phone}</span>
                            <span className="text-[10px] text-charcoal-600 block truncate max-w-xs">{order.customer?.address}</span>
                          </td>

                          {/* Type */}
                          <td className="py-3 px-4">
                            <span className="inline-block uppercase font-bold text-[10px] tracking-wider text-garden-800 bg-garden-50 px-2 py-0.5 rounded-sm">
                              {order.orderType}
                            </span>
                            {order.tableNo && order.tableNo !== 'N/A' && (
                              <span className="text-[11px] text-charcoal-600 block mt-0.5">{order.tableNo}</span>
                            )}
                          </td>

                          {/* Items */}
                          <td className="py-3 px-4 max-w-xs">
                            <ul className="space-y-0.5">
                              {order.items.map((it, idx) => (
                                <li key={idx} className="text-charcoal-800 truncate">
                                  <strong>{it.quantity}x</strong> {it.name}
                                </li>
                              ))}
                            </ul>
                          </td>

                          {/* Amount */}
                          <td className="py-3 px-4 font-mono font-bold text-sm text-garden-950">
                            {restaurantInfo.currency}{order.amount}
                          </td>

                          {/* Status Dropdown with immediate localStorage persistence */}
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                                order.status === 'New'
                                  ? 'bg-blue-50 border-blue-300 text-blue-800'
                                  : order.status === 'Preparing'
                                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                                  : order.status === 'Ready'
                                  ? 'bg-purple-50 border-purple-300 text-purple-800'
                                  : order.status === 'Delivered'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                  : 'bg-rose-50 border-rose-300 text-rose-800'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Ready">Ready</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PAYMENTS HISTORY TABLE */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-3xl border border-cream-300 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-cream-100/80 border-b border-cream-300 text-charcoal-700 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Payment ID</th>
                    <th className="py-3.5 px-4">Order Ref</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Method</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Payment Status</th>
                    <th className="py-3.5 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200">
                  {filteredPayments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-cream-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-garden-950">
                        {pay.id}
                      </td>
                      <td className="py-3 px-4 font-mono text-charcoal-700">
                        {pay.orderId}
                      </td>
                      <td className="py-3 px-4 text-charcoal-800 font-medium">
                        {pay.customerName}
                      </td>
                      <td className="py-3 px-4 text-charcoal-800">
                        {pay.method}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-garden-950">
                        {restaurantInfo.currency}{pay.amount}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          pay.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : pay.status === 'Refunded'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-charcoal-700 whitespace-nowrap">
                        {pay.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TABLE BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-cream-300 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-cream-100/80 border-b border-cream-300 text-charcoal-700 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Booking ID</th>
                    <th className="py-3.5 px-4">Guest Name</th>
                    <th className="py-3.5 px-4">Phone</th>
                    <th className="py-3.5 px-4">Reservation Date &amp; Time</th>
                    <th className="py-3.5 px-4">Party Size</th>
                    <th className="py-3.5 px-4">Special Notes</th>
                    <th className="py-3.5 px-4">Booking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-charcoal-600">
                        No table reservations recorded yet.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((bk) => (
                      <tr key={bk.id} className="hover:bg-cream-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-garden-950">
                          {bk.id}
                        </td>
                        <td className="py-3 px-4 font-bold text-charcoal-900">
                          {bk.name}
                        </td>
                        <td className="py-3 px-4 text-charcoal-700">
                          <a href={`tel:${bk.phone}`} className="hover:underline">{bk.phone}</a>
                        </td>
                        <td className="py-3 px-4 font-medium text-garden-950">
                          {bk.date} at {bk.time}
                        </td>
                        <td className="py-3 px-4 font-bold text-center">
                          {bk.guests} Guests
                        </td>
                        <td className="py-3 px-4 max-w-xs text-charcoal-700 italic">
                          {bk.notes || '—'}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={bk.status}
                            onChange={(e) => updateBookingStatus(bk.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-bold cursor-pointer ${
                              bk.status === 'Confirmed'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : bk.status === 'Cancelled'
                                ? 'bg-rose-50 border-rose-300 text-rose-800'
                                : 'bg-amber-50 border-amber-300 text-amber-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
