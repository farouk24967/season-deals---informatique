
export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number; // Kept in data, ignored in UI
  reviews: number; // Kept in data, ignored in UI
  isNew?: boolean;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
}
