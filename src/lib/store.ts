import { writable, derived } from 'svelte/store';
import type { CartItem, PromoParams } from './types';

const initialItems: CartItem[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'premium wireless headphones with noise cancellation and 30-hour battery life.',
    limit: 5,
    quantity: 1
  },
  {
    id: '2',
    name: 'Minimalist Watch',
    price: 129.50,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'A sleek, minimalist watch that fits any style. Water resistant.',
    limit: 3,
    quantity: 1
  },
  {
    id: '3',
    name: 'Modern Camera',
    price: 899.00,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
    description: 'Compact mirrorless camera perfect for travel and street photography.',
    limit: 2,
    quantity: 1
  }
];

export const cartItems = writable<CartItem[]>(initialItems);
export const appliedPromo = writable<PromoParams | null>(null);
export const promoCode = writable<string>('');

export const SHIPPING_COST = 20.00;

export const cartTotals = derived(
    [cartItems, appliedPromo],
    ([$cartItems, $appliedPromo]) => {
        const subtotal = $cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = 0;
        let shipping = SHIPPING_COST;

        if ($appliedPromo) {
            if ($appliedPromo.type === 'percent') {
                discount = (subtotal * $appliedPromo.value) / 100;
            } else if ($appliedPromo.type === 'fixed') {
                discount = $appliedPromo.value;
            } else if ($appliedPromo.type === 'shipping') {
                shipping = 0;
            }
        }
        
        // Ensure discount doesn't exceed subtotal (unless it's just free shipping which is independent)
        if ($appliedPromo?.type !== 'shipping' && discount > subtotal) {
            discount = subtotal;
        }

        const total = Math.max(0, subtotal - discount + shipping);

        return {
            subtotal,
            discount,
            shipping,
            total
        };
    }
);

export const PROMO_CODES: Record<string, PromoParams> = {
    'SAVE10': { code: 'SAVE10', type: 'percent', value: 10 },
    'SAVE20': { code: 'SAVE20', type: 'percent', value: 20 },
    'WELCOME': { code: 'WELCOME', type: 'percent', value: 15 },
    'DEAL30': { code: 'DEAL30', type: 'percent', value: 30 },
    'FREESHIP': { code: 'FREESHIP', type: 'shipping', value: 0 },
    'FLAT50': { code: 'FLAT50', type: 'percent', value: 50 }
};
