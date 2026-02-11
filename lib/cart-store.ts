import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    addItem: (product: Product, quantity: number, selectedSize: string, selectedColor: string) => void;
    removeItem: (productId: string, selectedSize: string, selectedColor: string) => void;
    updateQuantity: (productId: string, selectedSize: string, selectedColor: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;

    // Computed values
    getTotalItems: () => number;
    getSubtotal: () => number;
    getTax: () => number;
    getShipping: () => number;
    getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product, quantity, selectedSize, selectedColor) => {
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (item) =>
                            item.product.id === product.id &&
                            item.selectedSize === selectedSize &&
                            item.selectedColor === selectedColor
                    );

                    if (existingItemIndex > -1) {
                        // Update quantity of existing item
                        const newItems = [...state.items];
                        newItems[existingItemIndex].quantity += quantity;
                        return { items: newItems };
                    } else {
                        // Add new item
                        return {
                            items: [
                                ...state.items,
                                { product, quantity, selectedSize, selectedColor },
                            ],
                        };
                    }
                });
            },

            removeItem: (productId, selectedSize, selectedColor) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) =>
                            !(
                                item.product.id === productId &&
                                item.selectedSize === selectedSize &&
                                item.selectedColor === selectedColor
                            )
                    ),
                }));
            },

            updateQuantity: (productId, selectedSize, selectedColor, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId &&
                            item.selectedSize === selectedSize &&
                            item.selectedColor === selectedColor
                            ? { ...item, quantity: Math.max(0, quantity) }
                            : item
                    ).filter((item) => item.quantity > 0),
                }));
            },

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            openCart: () => set({ isOpen: true }),

            closeCart: () => set({ isOpen: false }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getSubtotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },

            getTax: () => {
                const subtotal = get().getSubtotal();
                return Math.round(subtotal * 0.18); // 18% GST
            },

            getShipping: () => {
                const subtotal = get().getSubtotal();
                return subtotal > 2000 ? 0 : 100; // Free shipping over ₹2000
            },

            getTotal: () => {
                return get().getSubtotal() + get().getTax() + get().getShipping();
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
