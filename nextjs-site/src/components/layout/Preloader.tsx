"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Minimum display time for smooth UX
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        // Also listen for window load
        const handleLoad = () => {
            setTimeout(() => setIsLoading(false), 300);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500"
            style={{ opacity: isLoading ? 1 : 0 }}
            aria-hidden="true"
        >
            <div className="flex flex-col items-center gap-4">
                {/* Rotary Wheel SVG */}
                <svg
                    viewBox="-60 -60 120 120"
                    width="80"
                    height="80"
                    className="preloader-wheel text-rotary-blue"
                    role="img"
                    aria-label="Loading"
                >
                    {/* Outer ring */}
                    <circle r="28" fill="none" stroke="currentColor" strokeWidth="6" />
                    {/* Center hub */}
                    <circle r="8" fill="currentColor" />
                    {/* 24 spokes (cogs) */}
                    <g fill="currentColor">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <rect
                                key={i}
                                x="-2"
                                y="-46"
                                width="4"
                                height="12"
                                rx="2"
                                transform={`rotate(${i * 15})`}
                            />
                        ))}
                    </g>
                </svg>
                <p className="text-sm text-gray-500 font-medium">Loading...</p>
            </div>
        </div>
    );
}
