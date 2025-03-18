
export interface Product {
  id: string;
  name: string;
  price: number;
  currency?: string;
  description?: string;
  image_url?: string;
  created_by?: string;
  category_id?: string;
  created_at?: string;
  is_new?: boolean;
  is_flash_sale?: boolean;
  categories?: {
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at?: string;
}
