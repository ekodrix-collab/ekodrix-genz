"use client";

import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 pb-32 overflow-hidden bg-background">
            {/* Background Typography - Massive and offset */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <motion.h1
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.05, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-[18vw] font-display font-black leading-none text-black tracking-tighter"
                >
                    GEN-Z
                </motion.h1>
            </div>

            <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
                {/* Left Content - Editorial Style */}
                <div className="lg:col-span-5 text-left mb-12 lg:mb-0 pr-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            Summer / Fall 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black leading-[0.9] uppercase mb-8 tracking-tighter">
                            New <br />
                            <span className="text-primary italic ">Standard</span> <br />
                            Of Style
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md mb-12 leading-relaxed font-medium">
                            Redefining the urban landscape through premium textures and aggressive silhouettes. Designed for the generation that refuses to settle.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-colors shadow-2xl"
                            >
                                Explore Drop
                            </button>
                            <Link
                                href="/sustainability"
                                className="px-10 py-5 border-2 border-black text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all text-center inline-block"
                            >
                                Sustainability
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content - Elevated Model Composition */}
                <div className="lg:col-span-7 relative md:pl-56">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative aspect-[4/5] w-full max-w-xl mx-auto lg:ml-auto"
                    >
                        {/* Main Image */}
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-[1px] border-black/5 shadow-2xl z-10">
                            <Image
                                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop"
                                alt="Gen-Z Fashion Model"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating Decoration */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-[#CCFF00] rounded-3xl -rotate-12 -z-0 hidden md:block"
                        />

                        <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-xl z-20 hidden md:block border border-black/5">
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Featured Item</p>
                            <h3 className="font-display font-black text-2xl uppercase">Tokyo Bomber</h3>
                            <p className="text-primary font-bold mt-1">₹7,499</p>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}

