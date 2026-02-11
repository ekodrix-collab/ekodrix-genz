"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="flex flex-row gap-4 overflow-x-auto md:flex-col md:overflow-visible">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2",
                            selectedImage === index ? "border-primary" : "border-transparent"
                        )}
                    >
                        <img
                            src={image}
                            alt={`Product image ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
            <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 md:aspect-square">
                <img
                    src={images[selectedImage]}
                    alt="Product main image"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
