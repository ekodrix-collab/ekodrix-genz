'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') || '000000';

    useEffect(() => {
        // Confetti animation could be added here
    }, []);

    return (
        <div className="min-h-screen bg-white py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been successfully placed.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Package className="text-gray-600" size={20} />
                            <p className="text-sm font-medium text-gray-600">Order Number</p>
                        </div>
                        <p className="text-3xl font-bold">#{orderId}</p>
                    </div>

                    <div className="space-y-4 mb-12 text-left max-w-md mx-auto">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Order Confirmation</h3>
                                <p className="text-sm text-gray-600">
                                    We've sent a confirmation email with your order details.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Shipping Updates</h3>
                                <p className="text-sm text-gray-600">
                                    You'll receive shipping updates as your order is processed.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Expected Delivery</h3>
                                <p className="text-sm text-gray-600">
                                    Your order will be delivered within 5-7 business days.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                            >
                                Continue Shopping
                                <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                        <Link href="/">
                            <button className="px-8 py-4 border-2 border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                                Back to Home
                            </button>
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t">
                        <p className="text-sm text-gray-500">
                            Need help? Contact us at{' '}
                            <a href="mailto:support@example.com" className="underline">
                                support@example.com
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
