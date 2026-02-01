import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import { FilterState } from '../types';
import { SlidersHorizontal, ChevronRight } from 'lucide-react';

interface SidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  counts: Record<string, number>;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, setFilters, counts }) => {
  // Local state for inputs to allow typing without jitter
  const [localMin, setLocalMin] = useState(filters.minPrice);
  const [localMax, setLocalMax] = useState(filters.maxPrice);

  useEffect(() => {
    setLocalMin(filters.minPrice);
    setLocalMax(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);
  
  const handleCategoryClick = (catId: string) => {
    setFilters(prev => ({ ...prev, category: catId }));
  };

  const applyPriceFilter = () => {
    setFilters(prev => ({
        ...prev,
        minPrice: Number(localMin),
        maxPrice: Number(localMax)
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      setLocalMax(val);
      // Optional: Auto apply on slider drag end, but for now stick to button
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      
      {/* Categories */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center space-x-2 mb-6 text-brand-gold">
          <SlidersHorizontal size={20} />
          <h3 className="font-bold text-lg text-white">Catégories</h3>
        </div>
        <ul className="space-y-1">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm transition-all ${
                  filters.category === cat.id
                    ? 'bg-brand-orange text-white font-medium shadow-md'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                {filters.category !== cat.id && (
                    <span className="text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
                        {counts[cat.id] || 0}
                    </span>
                )}
                {filters.category === cat.id && <ChevronRight size={14} />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
        <h3 className="font-bold text-lg text-white mb-4">Prix (DA)</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Min</span>
            <span>Max</span>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-brand-orange"
              placeholder="0"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input 
              type="number" 
              value={localMax}
              onChange={(e) => setLocalMax(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-brand-orange"
              placeholder="Max"
            />
          </div>
          
          <input 
            type="range" 
            min="0"
            max="100000"
            step="500"
            value={localMax}
            onChange={handleSliderChange}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-orange" 
          />
          
          <button 
            onClick={applyPriceFilter}
            className="w-full py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-brand-gold hover:text-brand-gold hover:bg-gray-800 transition-all text-sm font-medium"
          >
            Appliquer
          </button>
        </div>
      </div>

      {/* Promotional Banner Small */}
      <div className="bg-gradient-to-br from-brand-orange to-red-600 rounded-xl p-6 text-white text-center shadow-lg">
        <h4 className="font-bold text-xl mb-2">-20% PROMO</h4>
        <p className="text-sm opacity-90 mb-4">Sur la sélection été ce week-end !</p>
        <button className="bg-white text-brand-orange px-4 py-2 rounded-lg text-sm font-bold w-full hover:bg-gray-100 transition-colors">
          En profiter
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;