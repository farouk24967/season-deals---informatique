import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, Zap, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onAddToCart: (id: number) => void;
  onBuyNow: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleFavorite: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isFavorite,
  onAddToCart, 
  onBuyNow, 
  onQuickView,
  onToggleFavorite
}) => {
  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-orange/20 hover:scale-[1.02] hover:border-gray-600 transition-all duration-300 flex flex-col">
      
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-800 p-4">
        {product.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-brand-gold text-brand-dark text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
            Nouveau
          </span>
        )}
        {product.originalPrice && (
           <span className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
            -{(100 - (product.price / product.originalPrice * 100)).toFixed(0)}%
          </span>
        )}
        
        {/* Wishlist Button Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute bottom-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all transform translate-y-2 group-hover:translate-y-0 ${
            isFavorite 
              ? 'bg-red-500/20 text-red-500 opacity-100' 
              : 'bg-gray-900/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
          }`}
        >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {/* Quick View Button Overlay */}
        <button 
            onClick={() => onQuickView(product)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/90 text-white px-4 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 hover:bg-brand-orange hover:scale-105 border border-gray-700 z-20"
        >
            <Eye size={16} />
            <span className="text-xs uppercase tracking-wider">Aperçu</span>
        </button>

        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Category Tag instead of Stars */}
        <div className="mb-2">
           <span className="text-[10px] uppercase font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
             {product.category}
           </span>
        </div>

        <h3 className="text-gray-100 font-medium text-sm sm:text-base leading-snug mb-3 line-clamp-2 flex-1 group-hover:text-brand-gold transition-colors">
          {product.title}
        </h3>

        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="flex flex-col mb-3">
             {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through mb-1">
                  {product.originalPrice.toLocaleString('fr-FR')} DA
                </span>
             )}
             <span className="text-lg sm:text-xl font-bold text-white">
                {product.price.toLocaleString('fr-FR')} <span className="text-brand-orange text-sm">DA</span>
             </span>
          </div>

          <div className="flex gap-2">
            <button 
                onClick={() => onAddToCart(product.id)}
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm border border-gray-700 hover:border-gray-600"
            >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">Ajouter</span>
            </button>
            <button 
                onClick={() => onBuyNow(product)}
                className="flex-[1.5] flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-gold text-white py-2.5 rounded-lg transition-all duration-300 font-bold text-sm shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-0.5"
            >
                <Zap size={16} className="fill-white" />
                <span>Acheter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;