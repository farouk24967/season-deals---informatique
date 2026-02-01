import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, CheckCircle, ChevronDown, MapPin, Truck, AlertTriangle } from 'lucide-react';
import { WILAYAS, WILAYA_TO_COMMUNES, PRODUCTS, DELIVERY_FEES } from '../constants';
import { Product, CartItem } from '../types';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
  cartItems?: CartItem[];
}

const OrderForm: React.FC<OrderFormProps> = ({ isOpen, onClose, selectedProduct, cartItems = [] }) => {
  const [formData, setFormData] = useState({
    productName: '',
    fullName: '',
    operator: '',
    phone: '',
    wilaya: '',
    commune: '',
    delivery: 'domicile'
  });

  const [availableCommunes, setAvailableCommunes] = useState<string[]>([]);
  const [communeSearch, setCommuneSearch] = useState('');
  const [showCommuneDropdown, setShowCommuneDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize product when modal opens
  useEffect(() => {
    if (selectedProduct) {
      // Single Product Buy Now
      setFormData(prev => ({ ...prev, productName: selectedProduct.title }));
    } else if (cartItems.length > 0) {
      // Cart Order
      const summary = `Panier (${cartItems.length} articles): ` + cartItems.map(i => `${i.quantity}x ${i.title}`).join(', ');
      setFormData(prev => ({ ...prev, productName: summary }));
    } else {
        setFormData(prev => ({ ...prev, productName: '' }));
    }
  }, [selectedProduct, cartItems, isOpen]);

  // Handle outside click for commune dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCommuneDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter communes based on search
  const filteredCommunes = availableCommunes.filter(c => 
    c.toLowerCase().includes(communeSearch.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'operator') {
      // Auto-prefix phone
      if (value && (!formData.phone || formData.phone.length < 2)) {
        setFormData(prev => ({ ...prev, phone: value }));
      } else if (value && formData.phone) {
         // Replace existing prefix
         const cleanPhone = formData.phone.length >= 2 ? formData.phone.substring(2) : formData.phone;
         setFormData(prev => ({ ...prev, phone: value + cleanPhone }));
      }
    }

    if (name === 'wilaya') {
      const communes = WILAYA_TO_COMMUNES[value] || [];
      setAvailableCommunes(communes);
      setCommuneSearch('');
      setFormData(prev => ({ 
          ...prev, 
          commune: '',
          // Reset delivery mode if current one is unavailable for new wilaya
          delivery: DELIVERY_FEES[value]?.home !== null ? 'domicile' : (DELIVERY_FEES[value]?.desk !== null ? 'yalidine' : '')
      }));
    }
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Digits only
    
    if (formData.operator && !value.startsWith(formData.operator)) {
      // Force operator prefix if user tries to delete it
      if (value.length < formData.operator.length) {
         value = formData.operator;
      } else {
         // Re-attach prefix if missing
         const raw = value.substring(0, 10); // truncate to max 10
         if (!value.startsWith(formData.operator)) {
            value = formData.operator + value.slice(formData.operator.length); 
         }
      }
    }
    
    // Limit to 10 chars
    if (value.length > 10) value = value.slice(0, 10);
    
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleCommuneSelect = (commune: string) => {
    setFormData(prev => ({ ...prev, commune }));
    setCommuneSearch(commune);
    setShowCommuneDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    const { fullName, operator, phone, wilaya, commune } = formData;
    
    if (!fullName || !operator || !phone || !wilaya || !commune) {
      alert('Veuillez remplir tous les champs.');
      e.preventDefault();
      return;
    }

    if (phone.length !== 10) {
      alert('Le numéro doit contenir exactement 10 chiffres.');
      e.preventDefault();
      return;
    }
    
    // Price Check
    const fees = DELIVERY_FEES[wilaya];
    const shippingCost = formData.delivery === 'domicile' ? fees?.home : fees?.desk;
    
    if (shippingCost === null || shippingCost === undefined) {
         alert('Livraison non disponible pour ce mode ou cette wilaya.');
         e.preventDefault();
         return;
    }

    // Allow standard form submission to webhook
  };

  // Pricing Logic
  const subtotal = useMemo(() => {
    if (selectedProduct) return selectedProduct.price;
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [selectedProduct, cartItems]);

  const currentFees = formData.wilaya ? DELIVERY_FEES[formData.wilaya] : null;
  const shippingCost = currentFees 
    ? (formData.delivery === 'domicile' ? currentFees.home : currentFees.desk) 
    : 0;
  
  const finalTotal = subtotal + (shippingCost || 0);

  if (!isOpen) return null;

  const isCartOrder = !selectedProduct && cartItems.length > 0;

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-brand-dark rounded-2xl text-left overflow-hidden shadow-2xl shadow-black transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-gray-700">
          
          {/* Header */}
          <div className="bg-gray-800 px-4 py-4 sm:px-6 flex justify-between items-center border-b border-gray-700">
             <h3 className="text-lg leading-6 font-bold text-white flex items-center gap-2" id="modal-title">
               <Truck className="text-brand-orange" size={20} />
               Passer une Commande
             </h3>
             <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
               <X size={24} />
             </button>
          </div>

          <form 
            id="myform" 
            action="https://hook.eu2.make.com/s0fln9fki3odgir6rb2myb4okp4mcqwc" 
            method="post"
            onSubmit={handleSubmit}
            className="px-4 py-6 sm:px-6 space-y-5"
          >
            {/* Hidden Fields for Price */}
            <input type="hidden" name="total_price" value={finalTotal} />
            <input type="hidden" name="shipping_price" value={shippingCost || 0} />

            {/* Product Display */}
            <div className="space-y-2">
               <label htmlFor="productName" className="block text-sm font-medium text-gray-400">Commande</label>
               <div className="relative">
                 {isCartOrder ? (
                    <textarea 
                        name="productName"
                        value={formData.productName}
                        readOnly
                        className="block w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 sm:text-sm h-24 resize-none"
                    />
                 ) : (
                    <>
                        <input 
                            type="text"
                            name="productName"
                            value={formData.productName}
                            readOnly
                            className="block w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 sm:text-sm"
                        />
                    </>
                 )}
               </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-400">Nom Complet *</label>
              <input 
                type="text" 
                name="fullName" 
                id="fullName" 
                value={formData.fullName}
                onChange={handleInputChange}
                className="block w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange sm:text-sm" 
                placeholder="Entrez votre nom complet" 
                required 
              />
            </div>

            {/* Phone Group */}
            <div className="grid grid-cols-3 gap-4">
               <div className="col-span-1 space-y-2">
                  <label htmlFor="operator" className="block text-sm font-medium text-gray-400">Opérateur *</label>
                  <div className="relative">
                    <select 
                        id="operator" 
                        name="operator" 
                        value={formData.operator}
                        onChange={handleInputChange}
                        className="block w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 sm:text-sm appearance-none" 
                        required
                    >
                        <option value="">Choix</option>
                        <option value="06">Mobilis (06)</option>
                        <option value="07">Djezzy (07)</option>
                        <option value="05">Ooredoo (05)</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-3.5 text-gray-500 pointer-events-none" size={14} />
                  </div>
               </div>
               <div className="col-span-2 space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400">Téléphone *</label>
                  <input 
                    type="text" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneInput}
                    className="block w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 sm:text-sm" 
                    placeholder="05XXXXXXXX" 
                    required 
                  />
               </div>
            </div>

            {/* Location Group */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="wilaya" className="block text-sm font-medium text-gray-400">Wilaya *</label>
                    <div className="relative">
                        <select 
                            id="wilaya" 
                            name="wilaya" 
                            value={formData.wilaya}
                            onChange={handleInputChange}
                            className="block w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-brand-orange/50 sm:text-sm appearance-none truncate" 
                            required
                        >
                            <option value="">Wilaya</option>
                            {WILAYAS.map(w => (
                                <option key={w.code} value={w.code}>{w.code} - {w.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-3.5 text-gray-500 pointer-events-none" size={14} />
                    </div>
                </div>

                <div className="space-y-2 relative" ref={dropdownRef}>
                    <label className="block text-sm font-medium text-gray-400">Commune *</label>
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Chercher..."
                            value={communeSearch}
                            onChange={(e) => {
                                setCommuneSearch(e.target.value);
                                setShowCommuneDropdown(true);
                            }}
                            onFocus={() => setShowCommuneDropdown(true)}
                            disabled={!formData.wilaya}
                            className="block w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-8 px-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                        />
                        <MapPin className="absolute left-2.5 top-3.5 text-gray-500" size={16} />
                        <input type="hidden" name="commune" value={formData.commune} />
                    </div>

                    {showCommuneDropdown && formData.wilaya && (
                        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-48 overflow-auto custom-scrollbar">
                            {filteredCommunes.length > 0 ? (
                                filteredCommunes.map((c, idx) => (
                                    <div 
                                        key={idx}
                                        className="px-4 py-2 hover:bg-brand-orange hover:text-white cursor-pointer text-sm text-gray-200 transition-colors"
                                        onClick={() => handleCommuneSelect(c)}
                                    >
                                        {c}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-sm text-gray-500">Aucune commune trouvée</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Delivery */}
            <div className="space-y-2 pt-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Mode de Livraison {formData.wilaya && "*"}</label>
                
                {!formData.wilaya ? (
                    <div className="text-gray-500 text-sm italic bg-gray-900 p-3 rounded-lg border border-dashed border-gray-700 text-center">
                        Veuillez sélectionner une Wilaya pour voir les tarifs de livraison.
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                        {currentFees?.home !== null ? (
                            <label className={`flex-1 flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${formData.delivery === 'domicile' ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600'}`}>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        value="domicile" 
                                        checked={formData.delivery === 'domicile'}
                                        onChange={handleInputChange}
                                        className="accent-brand-orange" 
                                    />
                                    <span className="font-medium text-sm">À Domicile</span>
                                </div>
                                <span className="text-sm font-bold">{currentFees?.home} DA</span>
                            </label>
                        ) : (
                            <div className="flex-1 p-3 border border-gray-800 bg-gray-900 rounded-lg text-gray-600 text-sm flex items-center gap-2">
                                <AlertTriangle size={14} /> Domicile non dispo
                            </div>
                        )}

                        {currentFees?.desk !== null ? (
                            <label className={`flex-1 flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${formData.delivery === 'yalidine' ? 'border-brand-orange bg-brand-orange/10 text-brand-orange' : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600'}`}>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        value="yalidine" 
                                        checked={formData.delivery === 'yalidine'}
                                        onChange={handleInputChange}
                                        className="accent-brand-orange" 
                                    />
                                    <span className="font-medium text-sm">Bureau (Stop Desk)</span>
                                </div>
                                <span className="text-sm font-bold">{currentFees?.desk} DA</span>
                            </label>
                        ) : (
                            <div className="flex-1 p-3 border border-gray-800 bg-gray-900 rounded-lg text-gray-600 text-sm flex items-center gap-2">
                                <AlertTriangle size={14} /> Bureau non dispo
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Price Summary */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-2 mt-4">
                <div className="flex justify-between text-sm text-gray-400">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString('fr-FR')} DA</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                    <span>Livraison {formData.wilaya ? `(${formData.delivery === 'domicile' ? 'Domicile' : 'Bureau'})` : ''}</span>
                    <span>
                        {shippingCost !== null 
                            ? `${shippingCost} DA` 
                            : '--'}
                    </span>
                </div>
                <div className="border-t border-gray-700 my-2 pt-2 flex justify-between text-lg font-bold text-white">
                    <span>Total à Payer</span>
                    <span className="text-brand-orange">
                         {(shippingCost !== null ? finalTotal : subtotal).toLocaleString('fr-FR')} DA
                    </span>
                </div>
            </div>

            {/* Submit */}
            <button 
                type="submit" 
                disabled={!formData.wilaya || shippingCost === null}
                className="w-full bg-gradient-to-r from-brand-gold to-green-600 hover:to-green-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-green-900/20 transform hover:-translate-y-1 transition-all duration-200 text-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>Confirmer ma commande</span>
                <CheckCircle size={20} />
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
                Paiement à la livraison après vérification du produit.
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;