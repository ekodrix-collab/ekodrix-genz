"use client";

import { useState } from 'react';
import { getAllProducts, getCategories, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "./product-card";
import { motion } from 'framer-motion';

export function ProductGrid() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const categories = getCategories();
    const products = selectedCategory === 'all'
        ? getAllProducts()
        : getProductsByCategory(selectedCategory);

    return (
        <section className="py-24 px-6 md:px-12 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">
                            Latest Drops
                        </h2>
                        <p className="text-gray-600 max-w-sm">
                            Curated pieces for the modern wardrobe. Designed for everyday style.
                        </p>
                    </div>

                    <div className="flex gap-6 mt-8 md:mt-0 text-sm uppercase tracking-wider">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`${selectedCategory === 'all'
                                    ? 'underline underline-offset-4'
                                    : 'text-gray-400 hover:text-black'
                                } transition-colors`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`${selectedCategory === category
                                        ? 'underline underline-offset-4'
                                        : 'text-gray-400 hover:text-black'
                                    } transition-colors capitalize`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

