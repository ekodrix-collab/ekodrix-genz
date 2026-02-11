import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

export interface CartItem extends Product {
    quantity: number;
    size: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, size: string) => void;
    removeItem: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    toggleCart: () => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            addItem: (product, size) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.id === product.id && item.size === size
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id && item.size === size
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                            isOpen: true,
                        };
                    }
                    return {
                        items: [...state.items, { ...product, quantity: 1, size }],
                        isOpen: true,
                    };
                }),
            removeItem: (productId, size) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.id === productId && item.size === size)
                    ),
                })),
            updateQuantity: (productId, size, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === productId && item.size === size
                            ? { ...item, quantity }
                            : item
                    ),
                })),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
);
