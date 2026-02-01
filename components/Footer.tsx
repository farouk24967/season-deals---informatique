import React from 'react';
import { Facebook, Instagram, MapPin } from 'lucide-react';
import { LOGO_URL } from '../constants';

const Footer: React.FC = () => {
  // Note: For simplicity in this structure, links here reset to top or could be connected to context. 
  // Given the constraints, we will just use href="#" which might reload, or we rely on the header nav.
  // Ideally, Footer would accept onNavigate prop too, but App is managing state. 
  // We will assume basic anchors for now as requested by user initially but styled to look like app links.
  
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
               <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-800">
                  <img src="photos/season-deals-logo.png" alt="Logo" className="h-full w-full object-cover" />
               </div>
               <span className="text-xl font-bold text-white">SEASON DEALS</span>
            </div>
            <p className="text-sm leading-relaxed">
              Votre destination pour les meilleurs produits de saison en Algérie. Sélectionnés pour leur qualité et leur utilité.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Catégories</h4>
            <ul className="space-y-3 text-sm">
              <li><button className="hover:text-brand-gold transition-colors text-left">Maison & Cuisine</button></li>
              <li><button className="hover:text-brand-gold transition-colors text-left">Électronique Utile</button></li>
              <li><button className="hover:text-brand-gold transition-colors text-left">Accessoires Quotidien</button></li>
              <li><button className="hover:text-brand-gold transition-colors text-left">Spécial Été</button></li>
            </ul>
          </div>

          {/* About & Help */}
          <div>
            <h4 className="text-white font-bold mb-6">Aide & Info</h4>
            <ul className="space-y-3 text-sm">
              <li><button className="hover:text-brand-gold transition-colors text-left">Qui sommes-nous ?</button></li>
              <li><button className="hover:text-brand-gold transition-colors text-left">Foire aux questions (FAQ)</button></li>
              <li><button className="hover:text-brand-gold transition-colors text-left">Politique de confidentialité</button></li>
              <li><button className="hover:text-brand-gold transition-colors text-left">Conditions d'utilisation</button></li>
            </ul>
          </div>

          {/* Location Only */}
          <div>
            <h4 className="text-white font-bold mb-6">Localisation</h4>
             <div className="flex items-start space-x-3 text-sm">
                <MapPin size={18} className="text-brand-orange mt-0.5" />
                <span>Livraison disponible sur 58 Wilayas (Algérie)</span>
              </div>
          </div>

        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2024 Season Deals. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;