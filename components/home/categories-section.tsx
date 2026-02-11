"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const categories = [
    {
        name: "Streetwear",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop",
        link: "/products?category=streetwear",
        grid: "md:col-span-2 md:row-span-2"
    },
    {
        name: "Essentials",
        image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1911&auto=format&fit=crop",
        link: "/products?category=essentials",
        grid: "md:col-span-1 md:row-span-1"
    },
    {
        name: "Accessories",
        image: "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=2070&auto=format&fit=crop",
        link: "/products?category=accessories",
        grid: "md:col-span-1 md:row-span-1"
    }
];

export function CategoriesSection() {
    return (
        <section className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-4">Curated Categories</h2>
                        <p className="text-gray-500 max-w-md">Explore our specialized collections designed for the modern Gen-Z lifestyle.</p>
                    </div>
                    <Link href="/products" className="group flex items-center gap-2 font-bold uppercase tracking-widest text-sm mb-2">
                        View All <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[800px]">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`relative group overflow-hidden rounded-3xl cursor-pointer ${cat.grid}`}
                        >
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <h3 className="text-3xl md:text-4xl font-display font-black uppercase mb-4">{cat.name}</h3>
                                <Link
                                    href={cat.link}
                                    className="inline-flex items-center justify-center w-12 h-12 bg-white text-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
                                >
                                    <ArrowUpRight size={20} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
