import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleOrders, samplePayments, sampleBookings } from '../data/restaurant';

const CartContext = createContext();

const CART_STORAGE_KEY = 'savannah_cart_items';
const ORDERS_STORAGE_KEY = 'savannah_orders_list';
const PAYMENTS_STORAGE_KEY = 'savannah_payments_list';
const BOOKINGS_STORAGE_KEY = 'savannah_table_bookings';

export function CartProvider({ children }) {
  // 1. Cart Items state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Failed to read cart from localStorage:", e);
      return [];
    }
  });

  // 2. Orders list (merged with sampleOrders)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(sampleOrders));
      return sampleOrders;
    } catch (e) {
      return sampleOrders;
    }
  });

  // 3. Payments list (merged with samplePayments)
  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem(PAYMENTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(samplePayments));
      return samplePayments;
    } catch (e) {
      return samplePayments;
    }
  });

  // 4. Table Bookings list (merged with sampleBookings)
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(sampleBookings));
      return sampleBookings;
    } catch (e) {
      return sampleBookings;
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to save cart to localStorage:", e);
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn("Failed to save orders to localStorage:", e);
    }
  }, [orders]);

  // Sync payments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(payments));
    } catch (e) {
      console.warn("Failed to save payments to localStorage:", e);
    }
  }, [payments]);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.warn("Failed to save bookings to localStorage:", e);
    }
  }, [bookings]);

  // Cart operations
  const addToCart = (item, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Add a newly placed order from demo checkout
  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: orderData.id || `SAV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "New",
      isSample: false,
    };

    const newPayment = {
      id: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
      orderId: newOrder.id,
      customerName: newOrder.customer?.name || "Guest Customer",
      amount: newOrder.amount,
      method: newOrder.paymentMethod || "UPI",
      status: "Paid",
      date: newOrder.date,
      isSample: false,
    };

    setOrders(prev => [newOrder, ...prev]);
    setPayments(prev => [newPayment, ...prev]);
    clearCart();

    return newOrder;
  };

  // Update order status from Owner Dashboard
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Add table booking from Contact form
  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Pending",
      isSample: false,
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Update booking status from Owner Dashboard
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST standard

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        tax,
        orders,
        payments,
        bookings,
        placeOrder,
        updateOrderStatus,
        addBooking,
        updateBookingStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
