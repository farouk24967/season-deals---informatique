import React from 'react';
import { CheckCircle2, Users, Rocket, Globe } from 'lucide-react';

const WhoAreWe: React.FC = () => {
  return (
    <section className="py-12 animate-slide-in">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold text-white mb-6">
                    Qui sommes-nous ?
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                    Chez <span className="text-brand-orange font-bold">Season Deals</span>, nous croyons que la technologie et le confort doivent être accessibles à tous, partout en Algérie.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group">
                    <img 
                        src="/season-deals---informatique/photos/team.jpg" 
                        alt="Notre équipe" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                        <h3 className="text-2xl font-bold text-white">Une équipe passionnée</h3>
                    </div>
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Notre Mission</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Notre rôle est simple : trouver, tester et sélectionner des produits vraiment utiles, puis vous les proposer quand vous en avez besoin. 
                        Nous ne vendons pas au hasard. Chaque produit est choisi pour répondre à un besoin réel du quotidien.
                    </p>
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="text-gray-200">Produits 100% testés et approuvés</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                                <Rocket size={20} />
                            </div>
                            <span className="text-gray-200">Livraison rapide sur 58 Wilayas</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                                <Users size={20} />
                            </div>
                            <span className="text-gray-200">Service client à votre écoute 7j/7</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl text-center hover:border-brand-orange transition-colors">
                    <Globe className="mx-auto text-brand-gold mb-4" size={40} />
                    <h3 className="text-xl font-bold text-white mb-2">Partout en Algérie</h3>
                    <p className="text-gray-400">Nous arrivons jusqu'à chez vous, peu importe où vous habitez.</p>
                 </div>
                 <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl text-center hover:border-brand-orange transition-colors">
                    <CheckCircle2 className="mx-auto text-brand-gold mb-4" size={40} />
                    <h3 className="text-xl font-bold text-white mb-2">Confiance Totale</h3>
                    <p className="text-gray-400">Paiement à la livraison après vérification de votre colis.</p>
                 </div>
                 <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl text-center hover:border-brand-orange transition-colors">
                    <Rocket className="mx-auto text-brand-gold mb-4" size={40} />
                    <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                    <p className="text-gray-400">Toujours à la recherche des dernières nouveautés pour vous simplifier la vie.</p>
                 </div>
            </div>
        </div>
    </section>
  );
};

export default WhoAreWe;