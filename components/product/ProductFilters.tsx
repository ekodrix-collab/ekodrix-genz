"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
    { id: "tees", name: "Tees" },
    { id: "hoodies", name: "Hoodies" },
    { id: "pants", name: "Pants" },
    { id: "jackets", name: "Jackets" },
    { id: "accessories", name: "Accessories" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function ProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [priceRange, setPriceRange] = useState([0, 300]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Clear
                </Button>
            </div>

            <Accordion type="single" collapsible defaultValue="category">
                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center space-x-2">
                                    <Checkbox id={category.id} />
                                    <Label htmlFor={category.id}>{category.name}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            <Slider
                                defaultValue={[0, 300]}
                                max={300}
                                step={10}
                                value={priceRange}
                                onValueChange={setPriceRange}
                            />
                            <div className="flex items-center justify-between text-sm">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="size">
                    <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-3 gap-2">
                            {sizes.map((size) => (
                                <div key={size} className="flex items-center space-x-2">
                                    <Checkbox id={`size-${size}`} />
                                    <Label htmlFor={`size-${size}`}>{size}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
