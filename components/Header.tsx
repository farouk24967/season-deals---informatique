import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react';
import {  } from '../constants';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearch: (query: string) => void;
  onNavigate: (page: 'home' | 'about' | 'wishlist') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onSearch, 
  onNavigate 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-700 bg-gray-900 flex items-center justify-center">
              <img src="photos/Season-Deals_d.png" alt="Season Deals" className="h-full w-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                SEASON DEALS
              </h1>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 mx-12">
            <div className="relative w-full max-w-xl mx-auto">
              <input 
                type="text" 
                placeholder="Rechercher un produit..." 
                className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all placeholder-gray-500"
                onChange={(e) => onSearch(e.target.value)}
              />
              <button className="absolute right-1 top-1 p-1.5 bg-gradient-to-r from-brand-orange to-brand-gold rounded-full text-white hover:opacity-90 transition-opacity">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button 
              onClick={onOpenWishlist}
              className="text-gray-300 hover:text-brand-gold transition-colors relative"
            >
              <Heart size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={onOpenCart}
              className="text-gray-300 hover:text-brand-gold transition-colors relative"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search (Visible only on mobile) */}
        <div className="mt-4 lg:hidden relative">
           <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-brand-gold"
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-b border-gray-800 p-4">
          <nav className="flex flex-col space-y-4">
            <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="text-left text-brand-gold font-medium">Accueil</button>
            <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }} className="text-left text-gray-300 hover:text-white">Qui sommes-nous ?</button>
            <button onClick={() => { onOpenWishlist(); setIsMenuOpen(false); }} className="text-left text-gray-300 hover:text-white">Mes Favoris</button>
            <hr className="border-gray-800" />
            <span className="text-gray-400 text-sm">Catégories</span>
            <a href="#" className="text-gray-300 hover:text-white pl-2">Maison & Cuisine</a>
            <a href="#" className="text-gray-300 hover:text-white pl-2">Électronique</a>
            <a href="#" className="text-gray-300 hover:text-white pl-2">Accessoires</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;