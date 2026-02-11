'use client';

import { notFound } from 'next/navigation';
import { useState, useMemo, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllProducts, formatPrice } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';
import { Minus, Plus, ShoppingCart, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = use(params);
    const products = getAllProducts();
    const product = useMemo(() => products.find((p) => p.slug === id), [products, id]);

    const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(0);
    const [activeSection, setActiveSection] = useState<string | null>('details');

    const addItem = useCartStore((state) => state.addItem);
    const openCart = useCartStore((state) => state.openCart);

    if (!product) {
        notFound();
    }

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) return;
        addItem(product, quantity, selectedSize, selectedColor);
        openCart();
    };

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-black transition-colors">Products</Link>
                    <span>/</span>
                    <span className="text-black">{product.name}</span>
                </div>

                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
                    {/* Images */}
                    <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-6">
                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[500px] no-scrollbar">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setMainImage(index)}
                                        className={`relative aspect-square w-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${mainImage === index ? 'border-primary ring-4 ring-primary/10' : 'border-transparent opacity-40 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square flex-1 bg-gray-50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5"
                        >
                            <Image
                                src={product.images[mainImage]}
                                alt={product.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7 space-y-10"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-full">New Arrival</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                                    {product.category}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-black leading-[0.9] uppercase mb-8 tracking-tighter">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6">
                                <span className="text-4xl font-black text-primary">{formatPrice(product.price)}</span>
                                {product.originalPrice > product.price && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl text-gray-400 line-through font-bold">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                        <span className="bg-[#CCFF00] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-xl">
                            {product.description}
                        </p>

                        {/* Size Selection */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    Select Size: <span className="text-black ml-2">{selectedSize}</span>
                                </label>
                                <button className="text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-8 hover:text-primary transition-colors">Size Guide</button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 flex items-center justify-center border-2 rounded-2xl text-xs font-black transition-all duration-300 ${selectedSize === size
                                            ? 'border-black bg-black text-white shadow-xl shadow-black/20 scale-105'
                                            : 'border-gray-100 hover:border-black hover:scale-105'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="space-y-6">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">
                                Select Color: <span className="text-black ml-2">{selectedColor}</span>
                            </label>
                            <div className="flex flex-wrap gap-4">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-8 py-4 border-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${selectedColor === color
                                            ? 'border-black bg-black text-white shadow-xl shadow-black/20 scale-105'
                                            : 'border-gray-100 hover:border-black hover:scale-105'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-6 pt-6">
                            <div className="flex items-center bg-gray-50 rounded-[2rem] p-2 border border-gray-100">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-4 hover:bg-white rounded-2xl transition-all shadow-sm active:scale-95"
                                >
                                    <Minus size={18} strokeWidth={3} />
                                </button>
                                <span className="text-lg font-black w-14 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-4 hover:bg-white rounded-2xl transition-all shadow-sm active:scale-95"
                                >
                                    <Plus size={18} strokeWidth={3} />
                                </button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-2xl shadow-black/20"
                            >
                                <ShoppingCart size={20} />
                                Add to Shopping Bag
                            </motion.button>
                        </div>

                        {/* Experience Accordion */}
                        <div className="pt-12 border-t border-gray-100 space-y-2">
                            {/* Product Details */}
                            <div className="border border-gray-100 rounded-3xl overflow-hidden bg-gray-50/50">
                                <button
                                    onClick={() => toggleSection('details')}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest">Product Details</span>
                                    <ChevronDown className={`transition-transform duration-500 ${activeSection === 'details' ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeSection === 'details' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="px-6 pb-6 space-y-4">
                                                {product.details ? (
                                                    <ul className="space-y-3">
                                                        {product.details.map((detail, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                                                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                                {detail}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-sm text-gray-600 font-medium">Standard premium construction and finish.</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Care Instructions */}
                            <div className="border border-gray-100 rounded-3xl overflow-hidden bg-gray-50/50">
                                <button
                                    onClick={() => toggleSection('care')}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest">Care Instructions</span>
                                    <ChevronDown className={`transition-transform duration-500 ${activeSection === 'care' ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeSection === 'care' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="px-6 pb-6">
                                                {product.careInstructions ? (
                                                    <ul className="space-y-3">
                                                        {product.careInstructions.map((instruction, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                                                <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                                                                {instruction}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-sm text-gray-600 font-medium">Machine wash cold. Tumble dry low.</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                                    <Image src="https://api.iconify.design/lucide:truck.svg" alt="Shipping" width={20} height={20} className="opacity-40" />
                                </div>
                                <div>
                                    <span className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Shipping</span>
                                    <span className="block text-xs font-bold">Free Over ₹2000</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                                    <Image src="https://api.iconify.design/lucide:rotate-ccw.svg" alt="Returns" width={20} height={20} className="opacity-40" />
                                </div>
                                <div>
                                    <span className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Returns</span>
                                    <span className="block text-xs font-bold">30 Day Window</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                                    <Image src="https://api.iconify.design/lucide:shield-check.svg" alt="Secure" width={20} height={20} className="opacity-40" />
                                </div>
                                <div>
                                    <span className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Secure</span>
                                    <span className="block text-xs font-bold">SSL Encrypted</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-gray-100 pt-32 pb-12">
                        <div className="flex items-end justify-between mb-16">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">Our Curated Selection</span>
                                <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">Complete The Look</h2>
                            </div>
                            <Link href="/products" className="text-[10px] font-black uppercase tracking-[0.2em] underline decoration-2 underline-offset-8 hover:text-primary transition-colors mb-4">View All Products</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {relatedProducts.map((relatedProduct, index) => (
                                <Link key={relatedProduct.id} href={`/product/${relatedProduct.slug}`} className="group">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="relative aspect-square bg-gray-50 rounded-[2rem] mb-8 overflow-hidden shadow-xl shadow-black/5">
                                            <Image
                                                src={relatedProduct.images[0]}
                                                alt={relatedProduct.name}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-display font-black text-xl uppercase tracking-tight group-hover:text-primary transition-colors duration-300">{relatedProduct.name}</h3>
                                                <span className="font-black text-lg">{formatPrice(relatedProduct.price)}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{relatedProduct.category}</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
