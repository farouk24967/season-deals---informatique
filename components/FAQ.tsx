import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment passer une commande ?",
      answer: "C'est très simple ! Choisissez le produit qui vous intéresse, cliquez sur 'Acheter' ou ajoutez-le au panier. Remplissez ensuite le formulaire avec vos coordonnées (Nom, Adresse, Téléphone) et validez. Nous vous appellerons pour confirmer."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "La livraison prend généralement entre 1 à 3 jours ouvrables selon votre wilaya. Nous travaillons avec des partenaires logistiques fiables pour assurer une livraison rapide."
    },
    {
      question: "Puis-je vérifier le produit avant de payer ?",
      answer: "Oui, tout à fait. Nous offrons le paiement à la livraison. Vous pouvez vérifier l'état de votre colis lors de la réception."
    },
    {
      question: "Que faire si le produit est défectueux ?",
      answer: "Nous offrons une garantie de satisfaction. Si le produit présente un défaut de fabrication, contactez-nous dans les 3 jours suivant la réception pour un échange ou un remboursement."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Questions Fréquentes</h2>
          <p className="text-gray-400">Tout ce que vous devez savoir avant d'acheter.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-brand-dark border border-gray-800 rounded-xl overflow-hidden">
              <button 
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-white">{faq.question}</span>
                {openIndex === index ? (
                    <ChevronUp className="text-brand-orange" size={20} />
                ) : (
                    <ChevronDown className="text-gray-500" size={20} />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;