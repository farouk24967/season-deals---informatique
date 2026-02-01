import React, { useState, useMemo, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ProductCarousel from './components/ProductCarousel';
import WhoAreWe from './components/WhoAreWe';
import Footer from './components/Footer';
import OrderForm from './components/OrderForm';
import ProductModal from './components/ProductModal';
import CartModal from './components/CartModal';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import { PRODUCTS, CATEGORIES } from './constants';
import { FilterState, Product, CartItem } from './types';
import { ArrowUpDown, CheckCircle, X, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

type ViewState = 'home' | 'about' | 'wishlist';

const App: React.FC = () => {
  // --- States ---
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    minPrice: 0,
    maxPrice: 100000 // Set a reasonable default max price
  });

  const [sortOption, setSortOption] = useState<string>('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Modal States
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Selected Product
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toast
  const [toast, setToast] = useState<{ visible: boolean; message: string; subMessage: string }>({
    visible: false,
    message: '',
    subMessage: ''
  });
  const toastTimeoutRef = useRef<number | null>(null);

  // --- Helpers ---
  
  // Calculate category counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    counts['all'] = PRODUCTS.length;
    PRODUCTS.forEach(p => {
        counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter Products Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // 1. View Filter (Wishlist vs Home)
    if (currentView === 'wishlist') {
        result = result.filter(p => wishlist.includes(p.id));
    } else {
        // Apply Category Filter only if not in wishlist mode
        if (filters.category !== 'all') {
            result = result.filter(p => p.category === filters.category);
        }
    }

    // 2. Search Filter
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(product => {
            const matchesTitle = product.title.toLowerCase().includes(query);
            const matchesDesc = product.description?.toLowerCase().includes(query);
            return matchesTitle || matchesDesc;
        });
    }

    // 3. Price Filter (Min/Max)
    // Only apply if we are not in wishlist (optional preference)
    if (currentView !== 'wishlist') {
       result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    }

    // 4. Sorting Logic
    // We create a copy to sort to avoid mutating the original array reference in simple sorts
    result = [...result]; 
    
    switch (sortOption) {
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            // Sort by isNew flag first, then by ID (assuming higher ID = newer)
            result.sort((a, b) => {
                if (a.isNew === b.isNew) return b.id - a.id;
                return a.isNew ? -1 : 1;
            });
            break;
        case 'promo':
            // Sort by products that have originalPrice (discounted)
            result.sort((a, b) => {
                const aIsPromo = !!a.originalPrice;
                const bIsPromo = !!b.originalPrice;
                if (aIsPromo === bIsPromo) return 0;
                return aIsPromo ? -1 : 1;
            });
            break;
        default: // 'relevance'
            // Default usually means ID order or original list order
            break;
    }

    return result;
  }, [filters, searchQuery, currentView, wishlist, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, currentView, sortOption]);


  // --- Handlers ---

  const handleAddToCart = (id: number) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === id);
      if (existingItem) {
        return prev.map(item => 
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    showToast('Ajouté au panier !', product.title);
  };

  const handleToggleFavorite = (id: number) => {
    setWishlist(prev => {
        const exists = prev.includes(id);
        const newWishlist = exists ? prev.filter(pid => pid !== id) : [...prev, id];
        
        // Show toast
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
            showToast(exists ? 'Retiré des favoris' : 'Ajouté aux favoris', product.title);
        }
        return newWishlist;
    });
  };

  const showToast = (message: string, subMessage: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ visible: true, message, subMessage });
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
        if (item.id === id) {
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
    }));
  };

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleNavigate = (page: ViewState) => {
    setCurrentView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'home') {
        setFilters(f => ({ ...f, category: 'all' }));
        setSearchQuery('');
    }
  };

  // --- Render ---

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const currentCategoryName = currentView === 'wishlist' 
    ? 'Mes Favoris' 
    : (CATEGORIES.find(c => c.id === filters.category)?.name || 'Produits');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-dark text-gray-200">
      
      <Header 
        cartCount={cartTotalItems} 
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => handleNavigate('wishlist')}
        onSearch={setSearchQuery}
        onNavigate={handleNavigate}
      />
      
      {currentView === 'home' && <Hero />}

      <main className="container mx-auto px-4 py-8 lg:py-12 flex-grow relative">
        
        {currentView === 'about' ? (
             <WhoAreWe />
        ) : (
             <>
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-8 flex items-center">
                    <button onClick={() => handleNavigate('home')} className="hover:text-white">Accueil</button>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-brand-gold">{currentCategoryName}</span>
                </div>

                {/* Carousel on Home only */}
                {currentView === 'home' && !searchQuery && filters.category === 'all' && (
                    <ProductCarousel products={PRODUCTS} />
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Sidebar */}
                {currentView !== 'wishlist' && (
                     <Sidebar filters={filters} setFilters={setFilters} counts={categoryCounts} />
                )}

                {/* Product Grid Area */}
                <div className="flex-1">
                    
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-gray-900 p-4 rounded-lg border border-gray-800 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 sm:mb-0">
                            {currentView === 'wishlist' && <Heart className="text-red-500 fill-current" size={20} />}
                            <h2 className="text-xl font-bold text-white">
                                {currentCategoryName}
                                <span className="text-sm font-normal text-gray-500 ml-2">({filteredProducts.length})</span>
                            </h2>
                        </div>
                        
                        {currentView !== 'wishlist' && (
                            <div className="flex items-center space-x-3 w-full sm:w-auto">
                                <span className="text-sm text-gray-400 whitespace-nowrap">Trier par:</span>
                                <div className="relative w-full sm:w-auto">
                                    <select 
                                      value={sortOption}
                                      onChange={(e) => setSortOption(e.target.value)}
                                      className="w-full sm:w-auto appearance-none bg-gray-800 text-white border border-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:border-brand-orange cursor-pointer hover:bg-gray-700"
                                    >
                                        <option value="relevance">Pertinence</option>
                                        <option value="promo">Promotions</option>
                                        <option value="newest">Nouveautés</option>
                                        <option value="price-asc">Prix croissant</option>
                                        <option value="price-desc">Prix décroissant</option>
                                    </select>
                                    <ArrowUpDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Grid */}
                    {paginatedProducts.length > 0 ? (
                        <div className={`grid grid-cols-1 sm:grid-cols-2 ${currentView === 'wishlist' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
                            {paginatedProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                isFavorite={wishlist.includes(product.id)}
                                onAddToCart={handleAddToCart}
                                onBuyNow={handleBuyNow}
                                onQuickView={handleQuickView}
                                onToggleFavorite={handleToggleFavorite}
                            />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-900 rounded-xl border border-dashed border-gray-700">
                            <p className="text-gray-400 text-lg">
                                {currentView === 'wishlist' 
                                    ? "Votre liste de favoris est vide." 
                                    : "Aucun produit ne correspond à vos critères."}
                            </p>
                            <button 
                                onClick={() => {
                                    handleNavigate('home');
                                    setFilters(prev => ({...prev, minPrice: 0, maxPrice: 100000}));
                                }}
                                className="mt-4 text-brand-orange hover:underline"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center space-x-2">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`h-10 w-10 flex items-center justify-center rounded-lg transition-colors font-bold ${
                                        currentPage === page 
                                            ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' 
                                            : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-brand-orange'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                    
                </div>
                </div>
             </>
        )}
      </main>

      <WhyUs />
      <FAQ />
      <Footer />

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={() => {
            setIsCartOpen(false);
            setSelectedProduct(null);
            setIsOrderModalOpen(true);
        }}
      />

      {/* Order Modal */}
      <OrderForm 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        selectedProduct={selectedProduct}
        cartItems={cartItems}
      />

      {/* Quick View Modal */}
      <ProductModal 
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900/95 backdrop-blur-md border border-gray-700 text-gray-100 p-4 rounded-xl shadow-2xl shadow-black/50 flex items-center gap-4 animate-slide-in max-w-sm w-full">
            <div className="flex-shrink-0 bg-brand-orange/20 p-2 rounded-full text-brand-orange">
                <CheckCircle size={20} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-white">{toast.message}</h4>
                <p className="text-xs text-gray-400 truncate">{toast.subMessage}</p>
            </div>
             {currentView !== 'wishlist' && !toast.message.includes('favoris') && (
                 <button 
                    onClick={() => setIsCartOpen(true)}
                    className="bg-brand-gold text-brand-dark font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-white transition-colors flex-shrink-0"
                >
                    Voir Panier
                </button>
             )}
             <button 
                onClick={() => setToast(prev => ({ ...prev, visible: false }))}
                className="text-gray-500 hover:text-white transition-colors p-1"
              >
                <X size={16} />
              </button>
        </div>
      )}
    </div>
  );
};

export default App;