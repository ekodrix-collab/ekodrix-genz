export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    category: string;
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
    featured: boolean;
    details?: string[];
    careInstructions?: string[];
}

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

export interface CheckoutFormData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
}
