"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
    const { items, removeItem, updateQuantity, isOpen, toggleCart, getSubtotal, getTax, getShipping, getTotal } = useCartStore();

    const subtotal = getSubtotal();
    const tax = getTax();
    const shipping = getShipping();
    const total = getTotal();

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="px-1">
                    <SheetTitle>Cart ({items.length})</SheetTitle>
                </SheetHeader>
                {items.length > 0 ? (
                    <>
                        <ScrollArea className="flex-1 pr-6">
                            <div className="flex flex-col gap-6 pt-4">
                                {items.map((item) => (
                                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                                        <div className="h-24 w-24 overflow-hidden rounded-md border bg-gray-100 flex-shrink-0 relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            {item.product.images && item.product.images[0] ? (
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                                    No Img
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="grid gap-1">
                                                <h3 className="font-medium">{item.product.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Size: {item.selectedSize} | Color: {item.selectedColor}
                                                </p>
                                                <p className="font-medium">{formatPrice(item.product.price)}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                                                        }
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-4 text-center text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                                                        }
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="space-y-4 pr-6 pt-6">
                            <div className="space-y-1.5 text-sm">
                                <div className="flex">
                                    <span className="flex-1">Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex text-muted-foreground">
                                    <span className="flex-1">Tax (18% GST)</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <div className="flex text-muted-foreground">
                                    <span className="flex-1">Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex border-t pt-4 font-medium">
                                    <span className="flex-1">Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                            <Link href="/cart">
                                <Button className="w-full mb-2" size="lg" variant="outline" onClick={toggleCart}>
                                    View Cart
                                </Button>
                            </Link>
                            <Link href="/checkout" onClick={toggleCart}>
                                <Button className="w-full" size="lg">
                                    Checkout
                                </Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-2">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        <span className="text-lg font-medium text-muted-foreground">
                            Your cart is empty
                        </span>
                        <Link href="/products" onClick={toggleCart}>
                            <Button variant="outline" className="mt-4">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

