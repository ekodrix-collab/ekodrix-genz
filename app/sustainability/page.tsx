"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Heart, ShieldCheck } from "lucide-react";
import Image from "next/image";

const values = [
    {
        icon: Leaf,
        title: "Organic Materials",
        description: "We use 100% organic cotton and recycled polyester in 80% of our collections.",
    },
    {
        icon: Recycle,
        title: "Circular Fashion",
        description: "Our goal is full circularity by 2030, with a take-back program for old garments.",
    },
    {
        icon: Heart,
        title: "Ethical Production",
        description: "Fair wages and safe working conditions are non-negotiable for our partners.",
    },
    {
        icon: ShieldCheck,
        title: "Radical Transparency",
        description: "Know exactly where your clothes come from and the impact they have on the planet.",
    },
];

export default function SustainabilityPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop"
                    alt="Sustainability Hero"
                    fill
                    className="object-cover brightness-[0.4]"
                    priority
                />
                <div className="relative z-10 text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1 bg-primary text-black rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6"
                    >
                        Our Responsibility
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white uppercase tracking-tighter"
                    >
                        CONSCIOUS <br /> <span className="text-primary italic">FUTURE</span>
                    </motion.h1>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-black uppercase leading-none">
                            Fashion that <br /> doesn't cost the <br /> <span className="italic underline decoration-primary underline-offset-8">Earth</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            At GEN-Z, we believe that style and sustainability shouldn't be mutual exclusives. We're on a mission to prove that high-end fashion can be ethical, sustainable, and accessible.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Every piece in our collection is designed with longevity in mind, using materials that mindfully respect our environment and the people who make them.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
                            alt="Sustainable Material"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6 md:px-12 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-4">Our Core Pillars</h2>
                        <div className="h-2 w-24 bg-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-colors group"
                            >
                                <div className="mb-6 inline-block p-4 bg-white/5 rounded-2xl group-hover:bg-primary transition-colors">
                                    <v.icon className="w-8 h-8 text-primary group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold uppercase mb-4">{v.title}</h3>
                                <p className="text-gray-400 group-hover:text-white transition-colors">{v.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 px-6 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto p-16 rounded-[4rem] bg-primary relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-display font-black uppercase text-black mb-8">Join the Movement</h2>
                        <p className="text-xl text-black/80 font-medium mb-12 max-w-xl mx-auto">
                            Stay updated on our sustainability journey and be the first to know about our conscious drops.
                        </p>
                        <button className="px-12 py-6 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl">
                            Subscribe Now
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
