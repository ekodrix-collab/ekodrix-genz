"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-8">
                <Check className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight mb-4 text-center">
                Order Confirmed
            </h1>

            <p className="text-neutral-500 mb-12 text-center max-w-md">
                Thank you for your purchase. We've sent a confirmation email to your inbox. Your order will be shipped within 24 hours.
            </p>

            <Link href="/">
                <button className="bg-black text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-neutral-800 transition-colors">
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
}
