import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity,
  onCheckout
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden" aria-labelledby="cart-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out">
            <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl border-l border-gray-800">
              
              {/* Header */}
              <div className="flex items-start justify-between px-4 py-6 sm:px-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                    <ShoppingBag className="text-brand-orange" />
                    <h2 className="text-lg font-medium text-white" id="cart-title">Mon Panier</h2>
                    <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
                        {cartItems.length} articles
                    </span>
                </div>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-white"
                    onClick={onClose}
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Fermer</span>
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center text-gray-600">
                            <ShoppingBag size={40} />
                        </div>
                        <p className="text-gray-400 text-lg">Votre panier est vide.</p>
                        <button 
                            onClick={onClose}
                            className="text-brand-orange font-medium hover:underline flex items-center gap-1"
                        >
                            Continuer mes achats <ArrowRight size={16} />
                        </button>
                    </div>
                ) : (
                    <ul role="list" className="-my-6 divide-y divide-gray-800">
                    {cartItems.map((item) => (
                        <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-800 bg-gray-800 p-2">
                            <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain object-center"
                            />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                            <div className="flex justify-between text-base font-medium text-white">
                                <h3 className="line-clamp-2 pr-4 text-sm">{item.title}</h3>
                                <p className="ml-4 flex-shrink-0 text-brand-gold">
                                    {(item.price * item.quantity).toLocaleString('fr-FR')} <span className="text-xs">DA</span>
                                </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center border border-gray-700 rounded-lg">
                                    <button 
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                        className="p-1 hover:bg-gray-800 text-gray-400 hover:text-white rounded-l-lg disabled:opacity-50"
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="px-2 text-white font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                        className="p-1 hover:bg-gray-800 text-gray-400 hover:text-white rounded-r-lg"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onRemoveItem(item.id)}
                                    className="font-medium text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                                >
                                    <Trash2 size={16} />
                                    <span>Supprimer</span>
                                </button>
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                )}
              </div>

              {/* Footer / Total */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-800 px-4 py-6 sm:px-6 bg-gray-900">
                    <div className="flex justify-between text-base font-medium text-white mb-4">
                    <p>Total</p>
                    <p className="text-xl text-brand-orange">{total.toLocaleString('fr-FR')} DA</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 mb-6">
                        Livraison et taxes calculées à l'étape suivante.
                    </p>
                    <div className="mt-6">
                    <button
                        onClick={onCheckout}
                        className="flex w-full items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-brand-orange to-brand-gold px-6 py-4 text-base font-bold text-white shadow-lg hover:from-orange-600 hover:to-yellow-600 transition-all transform hover:-translate-y-1"
                    >
                        Commander tout ({cartItems.length})
                    </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        ou{' '}
                        <button
                        type="button"
                        className="font-medium text-brand-orange hover:text-brand-gold"
                        onClick={onClose}
                        >
                        Continuer mes achats
                        <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </p>
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;