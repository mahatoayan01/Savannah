import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ isOpen, onClose, images, currentIndex, onIndexChange }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleNext = () => {
    onIndexChange((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/40">
          <img
            src={currentImage.image}
            alt={currentImage.title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl"
          />
        </div>

        {/* Caption bar */}
        <div className="mt-4 text-center max-w-xl">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-terracotta-400 mb-1">
            <span>{currentImage.category}</span>
            <span>•</span>
            <span>{currentIndex + 1} of {images.length}</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-white mb-1">
            {currentImage.title}
          </h3>
          <p className="text-sm text-cream-200/80">
            {currentImage.description}
          </p>
        </div>
      </div>
    </div>
  );
}
