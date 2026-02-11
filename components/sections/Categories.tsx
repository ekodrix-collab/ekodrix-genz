"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
    {
        name: "Tees",
        slug: "tees",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
        colSpan: "md:col-span-2",
    },
    {
        name: "Hoodies",
        slug: "hoodies",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
        colSpan: "md:col-span-1",
    },
    {
        name: "Pants",
        slug: "pants",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
        colSpan: "md:col-span-1",
    },
    {
        name: "Accessories",
        slug: "accessories",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
        colSpan: "md:col-span-2",
    },
];

export function Categories() {
    return (
        <section className="py-24 bg-secondary/30">
            <div className="container">
                <div className="mb-12">
                    <h2 className="font-display text-4xl font-bold tracking-tight">
                        Shop by Category
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 h-[800px] md:h-[600px]">
                    {categories.map((category, index) => (
                        <Link
                            key={category.slug}
                            href={`/products?category=${category.slug}`}
                            className={`group relative overflow-hidden rounded-xl ${category.colSpan}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="h-full w-full"
                            >
                                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40 z-10" />
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 z-20 flex items-center justify-center">
                                    <h3 className="font-display text-4xl font-bold text-white uppercase tracking-wider">
                                        {category.name}
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
