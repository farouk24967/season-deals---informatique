import React from 'react';
import { ShieldCheck, Truck, ThumbsUp, Headset } from 'lucide-react';

const WhyUs: React.FC = () => {
  return (
    <section className="py-16 bg-brand-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Pourquoi choisir SeasonDeals ?</h2>
            <div className="h-1 w-20 bg-brand-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-brand-orange/50 transition-colors text-center group">
                <div className="h-14 w-14 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <ShieldCheck className="text-brand-orange" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2"></h3>
                <p className="text-gray-400 text-sm">Chaque article est rigoureusement sélectionné et testé pour garantir sa qualité.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-brand-orange/50 transition-colors text-center group">
                <div className="h-14 w-14 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <Truck className="text-brand-orange" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Livraison 58 Wilayas</h3>
                <p className="text-gray-400 text-sm">nous travaillons avec des partenaires pour livrer partout en Algérie rapidement et en toute sécurité avec Yalidine.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-brand-orange/50 transition-colors text-center group">
                <div className="h-14 w-14 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <ThumbsUp className="text-brand-orange" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Paiement à la livraison</h3>
                <p className="text-gray-400 text-sm">Ne payez qu'à la réception de votre commande. Zéro risque, 100% confiance.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-brand-orange/50 transition-colors text-center group">
                <div className="h-14 w-14 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <Headset className="text-brand-orange" size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Service Client Réactif</h3>
                <p className="text-gray-400 text-sm">Une question ? Notre équipe est disponible pour vous accompagner avant et après l'achat.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;