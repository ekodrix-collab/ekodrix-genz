'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/products';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getSubtotal, getTax, getShipping, getTotal } = useCartStore();

    const subtotal = getSubtotal();
    const tax = getTax();
    const shipping = getShipping();
    const total = getTotal();

    if (items.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
                <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
                <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-gray-600 mb-8">Add some products to get started</p>
                <Link href="/products">
                    <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        Shop Now
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Back button */}
                <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Continue Shopping
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-12">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-6 pb-6 border-b"
                            >
                                {/* Product Image */}
                                <div className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {item.product.images && item.product.images[0] ? (
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center px-2">
                                            {item.product.name}
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <Link href={`/product/${item.product.slug}`}>
                                            <h3 className="font-semibold text-lg hover:underline">{item.product.name}</h3>
                                        </Link>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {item.selectedSize} • {item.selectedColor}
                                        </p>
                                        <p className="font-semibold mt-2">{formatPrice(item.product.price)}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                                className="p-2 border-2 border-gray-300 rounded-lg hover:border-black transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                                className="p-2 border-2 border-gray-300 rounded-lg hover:border-black transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                                            className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2"
                                        >
                                            <Trash2 size={18} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (18% GST)</span>
                                    <span className="font-medium">{formatPrice(tax)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                                </div>
                                {shipping === 0 && subtotal < 2000 && (
                                    <p className="text-xs text-gray-500">Free shipping on orders over ₹2000</p>
                                )}
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Proceed to Checkout
                                </motion.button>
                            </Link>

                            {/* Trust badges */}
                            <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                                <p>✓ Secure checkout</p>
                                <p>✓ Free returns within 30 days</p>
                                <p>✓ Customer support available 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
