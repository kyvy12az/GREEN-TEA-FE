export interface Product {
  id: string;
  name: string;
  slug?: string | null;
  price: number;
  description: string;
  short_description?: string;
  category: string;
  origin: 'vietnam' | 'japan';
  image?: string | null;
  images?: string[];
  size?: string | null;
  brewing_instructions?: string | null;
  ingredients?: string | null;
  rating?: number;
  reviews?: number;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  featured?: boolean;
  discount?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFilters {
  category?: string;
  origin?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
}
