import products from '@/data/products.json';
import { Product } from '@/types';

export function getAllProducts(): Product[] {
    return products as Product[];
}

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured) as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug) as Product | undefined;
}

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id) as Product | undefined;
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category === category) as Product[];
}

export function getCategories(): string[] {
    const categories = products.map((p) => p.category);
    return Array.from(new Set(categories));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(price);
}

