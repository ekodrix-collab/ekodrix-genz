"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function Newsletter() {
    return (
        <section className="py-24 border-t">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
                >
                    <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                        Join the Movement
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Subscribe to our newsletter for exclusive drops, early access to sales,
                        and behind-the-scenes content.
                    </p>
                    <form className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:gap-4 mt-6">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="h-12"
                        />
                        <Button size="lg" className="h-12 w-full sm:w-auto">
                            Subscribe
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-4">
                        By subscribing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
