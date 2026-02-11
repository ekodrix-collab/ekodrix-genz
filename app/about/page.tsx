"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="container py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mx-auto max-w-3xl text-center"
            >
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
                    ABOUT GEN-Z
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    We are a brand born from the digital age, designed for the generation that
                    rewrites the rules. We believe in bold expression, uncompromising quality,
                    and sustainable practices.
                </p>
            </motion.div>

            <div className="mt-20 grid gap-12 md:grid-cols-2 lg:gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                >
                    <img
                        src="/images/products/about-us.jpg"
                        alt="About Image"
                        className="h-full w-full object-cover"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="font-display text-3xl font-bold">Our Philosophy</h2>
                    <p className="text-muted-foreground">
                        Fashion is more than just clothing; it's a statement. It's how you show
                        the world who you are without saying a word. At GEN-Z, we curate pieces
                        that empower you to express your unique identity.
                    </p>
                    <p className="text-muted-foreground">
                        From the streets to the screens, our designs are improved by the
                        culture that surrounds us. We are constantly evolving, just like you.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
