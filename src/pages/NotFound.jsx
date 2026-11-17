import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft, Home as HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-cream-50 px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center border border-cream-300 shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-garden-100 text-garden-800 flex items-center justify-center mx-auto">
          <Leaf className="w-8 h-8 text-terracotta-500" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-3xl font-bold text-terracotta-600 block">404</span>
          <h1 className="font-serif text-2xl font-bold text-garden-950">
            Path not found in the garden
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700">
            The page you are looking for has either blossomed elsewhere or doesn't exist.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3.5 bg-garden-800 hover:bg-garden-900 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
        >
          <HomeIcon className="w-4 h-4" />
          <span>Return to Savannah Home</span>
        </Link>
      </div>
    </div>
  );
}
