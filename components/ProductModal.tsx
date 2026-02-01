import React from 'react';
import { X, ShoppingCart, Zap, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (id: number) => void;
  onBuyNow: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onAddToCart, onBuyNow }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-brand-dark rounded-2xl text-left overflow-hidden shadow-2xl shadow-black transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full border border-gray-700">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-gray-900/50 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 bg-gray-800 p-8 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/50 to-transparent"></div>
               <img 
                 src={product.image} 
                 alt={product.title} 
                 className="w-full h-auto max-h-[400px] object-contain relative z-10 transform hover:scale-105 transition-transform duration-500"
               />
               {product.isNew && (
                  <span className="absolute top-4 left-4 bg-brand-gold text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Nouveau
                  </span>
               )}
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                 <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-brand-gold border border-gray-700 uppercase tracking-wide">
                   {product.category}
                 </span>
                 <span className="text-gray-500 text-sm">Réf: {product.id}00{product.id}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {product.title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {product.description || "Découvrez ce produit exceptionnel de notre sélection. Testé et approuvé pour sa qualité et son utilité au quotidien."}
              </p>

              <div className="mt-auto">
                 <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold text-white">
                        {product.price.toLocaleString('fr-FR')} <span className="text-brand-orange text-lg">DA</span>
                    </span>
                    {product.originalPrice && (
                       <span className="ml-4 text-lg text-gray-500 line-through">
                          {product.originalPrice.toLocaleString('fr-FR')} DA
                       </span>
                    )}
                 </div>

                 {/* Features Mockups */}
                 <div className="space-y-2 mb-8">
                    <div className="flex items-center text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-green-500 mr-2" />
                        <span>Livraison 58 Wilayas</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-green-500 mr-2" />
                        <span>Paiement à la livraison</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-green-500 mr-2" />
                        <span>Garantie satisfaction</span>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                        onClick={() => {
                            onAddToCart(product.id);
                            onClose();
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-3.5 rounded-xl transition-all duration-300 font-bold border border-gray-600 hover:border-gray-500"
                    >
                        <ShoppingCart size={20} />
                        <span>Ajouter</span>
                    </button>
                    <button 
                        onClick={() => {
                            onClose();
                            onBuyNow(product);
                        }}
                        className="flex-[1.5] flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-gold text-white py-3.5 rounded-xl transition-all duration-300 font-bold shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-1"
                    >
                        <Zap size={20} className="fill-white" />
                        <span>Acheter maintenant</span>
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;