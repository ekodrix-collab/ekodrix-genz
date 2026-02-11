"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function LookbookSection() {
    return (
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black text-white">
            <div className="absolute inset-0 opacity-60">
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            Spring Summer 2026
                        </span>
                        <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-none mb-8">
                            The New <br />
                            <span className="text-[#CCFF00]">Urban</span> Legend
                        </h2>
                        <p className="text-lg text-gray-300 max-w-md mb-12 leading-relaxed">
                            Captured in the heart of Tokyo, our latest collection defines the boundaries between high-performance gear and premium streetwear.
                        </p>
                        <button className="group flex items-center gap-4 bg-[#CCFF00] text-black px-8 py-4 rounded-full font-bold uppercase tracking-tighter hover:bg-white transition-colors">
                            View Lookbook
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="hidden md:block"
                    >
                        <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden border-[12px] border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1549037173-e3b717902c57?q=80&w=2070&auto=format&fit=crop"
                                alt="Lookbook Feature"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating numbers/text for extra editorial feel */}
            <div className="absolute top-20 right-20 text-[15vw] font-display font-black opacity-10 leading-none pointer-events-none">
                02
            </div>
            <div className="absolute bottom-20 left-20 text-[10vw] font-display font-black opacity-10 leading-none pointer-events-none">
                2026
            </div>
        </section>
    );
}
