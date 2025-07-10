export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'seedlings' | 'coffee';
  subcategory: string;
  image: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  roastLevel?: 'light' | 'medium' | 'dark';
  origin?: string;
  organic?: boolean;
  bloom?: string; // 開花時期
  sunlight?: string; // 日当たり
  inStock: boolean;
  rating: number;
  reviews: number;
  tags?: Array<'new' | 'sale' | 'limited' | 'recommended' | 'free-shipping' | 'popular' | 'organic'>;
  discount?: number; // 割引率（%）
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  category?: 'seedlings' | 'coffee' | 'all';
  priceRange?: [number, number];
  difficulty?: string[];
  roastLevel?: string[];
  organic?: boolean;
  inStock?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}