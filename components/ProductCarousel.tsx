import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Show only top 5 products or new products
  const featuredProducts = products.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1));
  };

  if (featuredProducts.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] md:h-[400px] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 mb-12 group">
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredProducts.map((product) => (
          <div key={product.id} className="w-full h-full flex-shrink-0 relative">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gray-900">
               <img src={product.image} alt="" className="w-full h-full object-cover opacity-20 blur-xl scale-110" />
            </div>
            
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center p-8 gap-8">
                <div className="w-1/2 h-full flex items-center justify-center">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-[80%] max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <div className="w-1/2 flex flex-col items-start justify-center text-left space-y-4">
                    <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        En Vedette
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                        {product.title}
                    </h2>
                    <p className="text-gray-400 line-clamp-2 max-w-md">
                        {product.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                        <span className="text-3xl font-bold text-brand-gold">
                            {product.price.toLocaleString('fr-FR')} DA
                        </span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                                {product.originalPrice.toLocaleString('fr-FR')} DA
                            </span>
                        )}
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-orange text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-orange text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredProducts.map((_, idx) => (
            <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-brand-orange w-6' : 'bg-gray-500'
                }`}
            />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;