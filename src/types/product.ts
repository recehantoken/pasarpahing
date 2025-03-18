
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  category_id?: string;
  created_at?: string;
  created_by?: string;
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
