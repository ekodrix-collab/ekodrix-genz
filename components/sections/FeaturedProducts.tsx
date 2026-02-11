"use client";

import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedProducts() {
    const featuredProducts = getFeaturedProducts();

    return (
        <section id="featured" className="py-24">
            <div className="container px-6 md:px-12 mx-auto">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="font-display text-4xl font-bold tracking-tight uppercase">
                            Featured Drops
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-xl font-medium">
                            Our latest collection of premium streetwear essentials. Designed for
                            comfort, built for style.
                        </p>
                    </div>
                    <a
                        href="/products"
                        className="hidden text-sm font-black uppercase tracking-widest hover:underline md:block decoration-2 underline-offset-8"
                    >
                        View all products →
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                <div className="mt-12 flex justify-center md:hidden">
                    <a href="/products" className="text-sm font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-8">
                        View all products →
                    </a>
                </div>
            </div>
        </section>
    );
}
