"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/products';
import { Product } from '@/types';
import { useCartStore } from '@/lib/cart-store';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const openCart = useCartStore((state) => state.openCart);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, 1, product.sizes[0], product.colors[0]);
        openCart();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group"
        >
            <Link href={`/product/${product.slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[3/4]">
                    {/* Modern Image Display */}
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Discount Badge */}
                    {product.originalPrice > product.price && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                            {Math.round(
                                ((product.originalPrice - product.price) /
                                    product.originalPrice) *
                                100
                            )}
                            % OFF
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 flex items-end justify-center p-6"
                    >
                        <button
                            onClick={handleQuickAdd}
                            className="w-full bg-white text-black py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#CCFF00] transition-colors flex items-center justify-center gap-2 shadow-xl"
                        >
                            <ShoppingCart size={14} />
                            Quick Add
                        </button>
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="mt-6 flex justify-between items-start">
                    <div>
                        <h3 className="font-display font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {product.category}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block font-black text-lg">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                            <span className="block text-[10px] text-gray-400 line-through font-bold">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
