import { HeroSection } from "@/components/home/hero-section";
import { TickerSection } from "@/components/home/ticker-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { LookbookSection } from "@/components/home/lookbook-section";
import { ProductCard } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section id="featured" className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-4">Featured Drops</h2>
            <p className="text-gray-500 max-w-2xl">
              Handpicked essentials for your wardrobe, curated for the next generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <TickerSection />

      <CategoriesSection />

      <LookbookSection />
    </div>
  );
}

