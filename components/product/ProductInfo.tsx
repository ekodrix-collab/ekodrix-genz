"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {product.name}
                </h1>
                <div className="mt-4 flex items-end gap-4">
                    <p className="text-2xl font-bold tracking-tight">${product.price}</p>
                    {product.originalPrice && (
                        <p className="text-lg text-muted-foreground line-through">
                            ${product.originalPrice}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-medium">Size</h3>
                <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors hover:border-primary",
                                selectedSize === size
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-input bg-background"
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center rounded-md border">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-none"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center">{quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-none"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button className="flex-1" size="lg" disabled={!selectedSize}>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description">
                    <AccordionTrigger>Description</AccordionTrigger>
                    <AccordionContent>
                        {product.description}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                    <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                    <AccordionContent>
                        Free shipping on orders over $150. Returns accepted within 30 days of
                        purchase.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
