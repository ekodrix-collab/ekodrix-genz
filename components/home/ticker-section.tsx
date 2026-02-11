"use client";

export function TickerSection() {
    const tickerItems = [
        "Flash Sale", "•", "New Drops", "•", "Limited Edition", "•", "GEN-Z EXCLUSIVE", "•"
    ];

    const TickerContent = () => (
        <div className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12">
            {[1, 2, 3, 4, 5, 6].map((group) => (
                <div key={group} className="flex items-center gap-8 md:gap-12">
                    {tickerItems.map((item, idx) => (
                        <span
                            key={`${group}-${idx}`}
                            className={`${item === "•"
                                ? "text-black/20 text-3xl md:text-4xl"
                                : "text-3xl md:text-5xl font-display font-black text-black uppercase italic tracking-tighter whitespace-nowrap"
                                }`}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <section className="relative h-20 md:h-24 bg-[#CCFF00] border-y-2 border-black overflow-hidden flex items-center z-20">
            <div className="flex w-max animate-marquee">
                <TickerContent />
                <TickerContent />
            </div>
        </section>
    );
}
