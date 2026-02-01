import React from 'react';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden border-b border-gray-800 min-h-[500px] flex items-center">
      {/* Decorative gradients/Glow */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] opacity-40"></div>
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/10 rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-yellow-500 to-brand-gold animate-pulse">
                SeasonDeals
              </span>
              , c’est le bon produit,<br/> au bon moment.
            </h2>
            
            <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Notre rôle est simple : <span className="text-white font-semibold">trouver, tester et sélectionner</span> des produits vraiment utiles, puis vous les proposer quand vous en avez besoin.
            </p>
            
            <p className="text-lg text-gray-400 italic">
               Nous ne vendons pas au hasard. Chaque produit est choisi pour répondre à un besoin réel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-lg mx-auto">
             <div className="flex items-center justify-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-3 rounded-xl shadow-lg hover:border-brand-orange/50 transition-colors">
                <CheckCircle2 className="text-brand-orange" size={20} />
                <span className="text-gray-200 font-medium">Été, printemps, automne ou hiver</span>
             </div>
             <div className="flex items-center justify-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-3 rounded-xl shadow-lg hover:border-brand-orange/50 transition-colors">
                <CheckCircle2 className="text-brand-orange" size={20} />
                <span className="text-gray-200 font-medium">Maison, électronique & quotidien</span>
             </div>
          </div>

          <div className="pt-8">
            <button className="animate-bounce p-3 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700">
               <ArrowDown size={24} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;