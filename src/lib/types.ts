export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  limit: number;
  quantity: number;
}

export interface PromoParams {
    code: string;
    type: 'percent' | 'fixed' | 'shipping';
    value: number;
}
