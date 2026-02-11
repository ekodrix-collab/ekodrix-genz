'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/products';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CreditCard } from 'lucide-react';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCartStore();

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = getSubtotal();
    const tax = getTax();
    const shipping = getShipping();
    const total = getTotal();

    // Redirect if cart is empty
    if (items.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
                <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-gray-600 mb-8">Add some products to checkout</p>
                <Link href="/products">
                    <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        Shop Now
                    </button>
                </Link>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = async () => {
        if (!validateForm()) return;

        setIsProcessing(true);

        // In test mode, we'll simulate Razorpay integration
        // For production, you'd initialize Razorpay properly with your keys
        try {
            // Simulate payment processing
            setTimeout(() => {
                clearCart();
                router.push(`/success?orderId=${Date.now()}`);
            }, 1500);
        } catch (error) {
            console.error('Payment failed:', error);
            setIsProcessing(false);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Back button */}
                <Link href="/cart" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Cart
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-12">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-colors ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-colors ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-colors ${errors.city ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-colors ${errors.state ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-colors ${errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-black transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="1234567890"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            {/* Items */}
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            {item.product.images && item.product.images[0] ? (
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                    <span className="text-[10px] text-gray-500">No Img</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{item.product.name}</p>
                                            <p className="text-xs text-gray-600">{item.selectedSize} • {item.selectedColor}</p>
                                            <p className="text-sm font-medium mt-1">
                                                {formatPrice(item.product.price)} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (18% GST)</span>
                                    <span className="font-medium">{formatPrice(tax)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CreditCard size={20} />
                                {isProcessing ? 'Processing...' : 'Pay with Razorpay (Test Mode)'}
                            </motion.button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                This is a demo. Test mode only.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
