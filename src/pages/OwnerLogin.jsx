import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  AlertCircle, 
  Info, 
  ArrowRight,
  Leaf,
  KeyRound
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurant';

export default function OwnerLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    try {
      if (sessionStorage.getItem('savannah_owner_auth') === 'true') {
        navigate('/owner-dashboard');
      }
    } catch (e) {
      console.warn("Storage check failed", e);
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const creds = restaurantInfo.ownerCredentials;

    if (
      username.trim().toLowerCase() === creds.username.toLowerCase() &&
      password === creds.password
    ) {
      try {
        sessionStorage.setItem('savannah_owner_auth', 'true');
        navigate('/owner-dashboard');
      } catch (err) {
        setError('Unable to access session storage. Please ensure cookies and storage are enabled.');
      }
    } else {
      setError('Invalid demo credentials. Please click the button below to pre-fill the correct demo login.');
    }
  };

  const fillDemoCreds = () => {
    setUsername(restaurantInfo.ownerCredentials.username);
    setPassword(restaurantInfo.ownerCredentials.password);
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-cream-50 px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-cream-300 shadow-xl space-y-6 animate-fadeIn">
        
        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-garden-800 text-white flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-7 h-7 text-terracotta-400" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-garden-950">
            Owner Management Portal
          </h1>
          <p className="text-xs text-charcoal-700">
            Savannah Garden Restaurant &amp; Cafe • Pune
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-cream-100/90 rounded-2xl p-4 border border-cream-300 space-y-2.5 text-xs text-charcoal-800">
          <div className="flex items-center justify-between">
            <span className="font-bold text-garden-950 flex items-center space-x-1.5">
              <KeyRound className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Demo Owner Credentials</span>
            </span>
            <span className="text-[10px] bg-terracotta-100 text-terracotta-800 font-bold px-2 py-0.5 rounded-sm">
              Public Demo
            </span>
          </div>

          <div className="space-y-1 font-mono text-[11px] bg-white p-2.5 rounded-xl border border-cream-200">
            <p><strong>Username:</strong> {restaurantInfo.ownerCredentials.username}</p>
            <p><strong>Password:</strong> {restaurantInfo.ownerCredentials.password}</p>
          </div>

          <button
            type="button"
            onClick={fillDemoCreds}
            className="w-full py-2 bg-garden-100 hover:bg-garden-200 text-garden-900 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center space-x-1"
          >
            <span>Auto-fill Demo Credentials</span>
          </button>
        </div>

        {/* Visible Insecurity / Demo Notice */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 flex items-start space-x-2 text-[11px] text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Notice:</strong> This is a client-side simulated demonstration portal using <code>sessionStorage</code>. It is intended for demo evaluation and is not secure for production authentication.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-800 block">
              Email / Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-charcoal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="owner@demo.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-garden-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-800 block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs focus:ring-2 focus:ring-garden-600 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-garden-800 hover:bg-garden-900 text-white font-semibold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center space-x-2"
          >
            <span>Log In to Dashboard</span>
            <ArrowRight className="w-4 h-4 text-terracotta-400" />
          </button>
        </form>

      </div>
    </div>
  );
}
