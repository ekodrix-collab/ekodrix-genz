"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { getAllProducts } from "@/lib/products";
import { Product } from "@/types";
import { Search } from "lucide-react";

interface SearchContentProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function SearchContent({ open, setOpen }: SearchContentProps) {
    const router = useRouter();
    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        setProducts(getAllProducts());
    }, []);

    const runCommand = React.useCallback(
        (command: () => unknown) => {
            setOpen(false);
            command();
        },
        [setOpen]
    );

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search products..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Products">
                    {products.map((product) => (
                        <CommandItem
                            key={product.id}
                            value={product.name}
                            onSelect={() => {
                                runCommand(() => router.push(`/products/${product.slug}`));
                            }}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span>{product.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Categories">
                    {Array.from(new Set(products.map((p) => p.category))).map((category) => (
                        <CommandItem
                            key={category}
                            value={category}
                            onSelect={() => {
                                runCommand(() => router.push(`/products?category=${category}`));
                            }}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span className="capitalize">{category}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
