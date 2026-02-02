"use client";

import { useState } from "react";
import Image from "next/image";

type LogoCategory = "club" | "district" | "theme";
type BackgroundType = "light" | "dark" | "checker";

const logos = [
    // CLUB - Cranberry
    {
        src: "/images/logos/club/RaCJPN-Cranberry-Regular.png",
        title: "JP Nagar — Cranberry (Regular)",
        tags: ["club", "regular"],
        category: "club",
    },
    {
        src: "/images/logos/club/RaCJPN-Cranberry-Simplified.png",
        title: "JP Nagar — Cranberry (Simplified)",
        tags: ["club", "simplified"],
        category: "club",
    },
    {
        src: "/images/logos/club/RaCJPN-Cranberry-UniteForGood-Regular.png",
        title: "JP Nagar — Cranberry + Unite For Good",
        tags: ["club", "theme"],
        category: "theme",
    },
    {
        src: "/images/logos/club/RaCJPN-Cranberry-UniteForGood-Simplified.png",
        title: "JP Nagar — Cranberry + UFG (Simplified)",
        tags: ["club", "theme", "simplified"],
        category: "theme",
    },
    // CLUB - Black
    {
        src: "/images/logos/club/RaCJPN-Black-Regular.png",
        title: "JP Nagar — Black (Regular)",
        tags: ["club", "regular"],
        category: "club",
    },
    {
        src: "/images/logos/club/RaCJPN-Black-Simplified.png",
        title: "JP Nagar — Black (Simplified)",
        tags: ["club", "simplified"],
        category: "club",
    },
    {
        src: "/images/logos/club/RaCJPN-Black-UniteForGood-Regular.png",
        title: "JP Nagar — Black + Unite For Good",
        tags: ["club", "theme"],
        category: "theme",
    },
    {
        src: "/images/logos/club/RaCJPN-Black-UniteForGood-Simplified.png",
        title: "JP Nagar — Black + UFG (Simplified)",
        tags: ["club", "theme", "simplified"],
        category: "theme",
    },
    // CLUB - White
    {
        src: "/images/logos/club/RaCJPN-White-Regular.png",
        title: "JP Nagar — White (Regular)",
        tags: ["club", "reversed"],
        category: "club",
        darkOnly: true,
    },
    {
        src: "/images/logos/club/RaCJPN-White-UniteForGood-Regular.png",
        title: "JP Nagar — White + Unite For Good",
        tags: ["club", "theme", "reversed"],
        category: "theme",
        darkOnly: true,
    },
    // DISTRICT
    {
        src: "/images/logos/district/Rotaract 3191 Masterbrand.png",
        title: "Rotaract 3191 — Masterbrand",
        tags: ["district", "regular"],
        category: "district",
    },
    {
        src: "/images/logos/district/Rotaract 3191 Masterbrand Simplified.png",
        title: "Rotaract 3191 — Simplified",
        tags: ["district", "simplified"],
        category: "district",
    },
    {
        src: "/images/logos/district/Rotaract 3191 Masterbrand - White.png",
        title: "Rotaract 3191 — White",
        tags: ["district", "reversed"],
        category: "district",
        darkOnly: true,
    },
];

export default function BrandCenterClient() {
    const [filter, setFilter] = useState<"all" | LogoCategory>("all");
    const [bgType, setBgType] = useState<BackgroundType>("light");
    const [selectedLogo, setSelectedLogo] = useState<typeof logos[0] | null>(null);

    const filteredLogos = logos.filter((logo) => {
        if (filter === "all") return true;
        if (filter === "theme") return logo.tags.includes("theme");
        return logo.category === filter;
    });

    const getBgClass = () => {
        switch (bgType) {
            case "dark":
                return "bg-slate-900 border-slate-700";
            case "checker":
                return "bg-checker border-gray-300 dark:border-gray-700"; // Custom checker class needed or utility
            default:
                return "bg-white border-gray-200";
        }
    };

    return (
        <section className="section-padding bg-[var(--bg-secondary)] min-h-screen">
            <div className="container mx-auto px-4 md:px-8">

                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 sticky top-24 z-30 py-4 bg-[var(--bg-secondary)]/95 backdrop-blur border-b border-[var(--border-color)]">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: "all", label: "All" },
                            { id: "club", label: "Club" },
                            { id: "district", label: "District" },
                            { id: "theme", label: "Theme" },
                        ].map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id as any)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${filter === f.id
                                    ? "bg-[var(--rotary-blue)] text-white border-[var(--rotary-blue)]"
                                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--rotary-blue)]"
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[var(--text-secondary)]">Preview:</span>
                        <div className="flex bg-[var(--bg-card)] p-1 rounded-lg border border-[var(--border-color)]">
                            {[
                                { id: "light", label: "Light" },
                                { id: "dark", label: "Dark" },
                                { id: "checker", label: "Checker" },
                            ].map((bg) => (
                                <button
                                    key={bg.id}
                                    onClick={() => setBgType(bg.id as BackgroundType)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${bgType === bg.id
                                        ? "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm"
                                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                                        }`}
                                >
                                    {bg.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredLogos.map((logo, index) => (
                        <article
                            key={index}
                            className="group bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                            {/* Thumb */}
                            <div
                                className={`relative aspect-[4/3] flex items-center justify-center p-6 border-b transition-colors ${getBgClass()} ${bgType === 'checker' ? "bg-[url('https://transparenttextures.com/patterns/black-scales.png')] bg-white" : ""
                                    }`}
                            >
                                {bgType === 'checker' && (
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: `linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)`,
                                        backgroundSize: `20px 20px`,
                                        backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`
                                    }} />
                                )}

                                <div className="relative w-full h-full">
                                    <Image
                                        src={logo.src}
                                        alt={logo.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 300px"
                                    />
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="p-4">
                                <h3 className="font-bold text-[var(--text-primary)] text-sm mb-2 leading-tight">
                                    {logo.title}
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {logo.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[var(--bg-secondary)] text-[var(--text-muted)] rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedLogo(logo)}
                                        className="flex-1 btn-primary text-xs py-2"
                                    >
                                        Preview
                                    </button>
                                    <a
                                        href={logo.src}
                                        download
                                        className="flex-1 btn-secondary text-xs py-2 justify-center"
                                    >
                                        PNG
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Modal Preview */}
                {selectedLogo && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity animate-fade-in"
                        onClick={() => setSelectedLogo(null)}
                    >
                        <div
                            className="bg-[var(--bg-card)] rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-zoom-in duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
                                <h3 className="font-bold text-lg text-[var(--text-primary)]">{selectedLogo.title}</h3>
                                <button
                                    onClick={() => setSelectedLogo(null)}
                                    className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Preview Area */}
                            <div className={`relative flex-grow flex items-center justify-center p-8 bg-checker overflow-auto min-h-[300px] ${getBgClass()}`}>
                                {bgType === 'checker' && (
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: `linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)`,
                                        backgroundSize: `20px 20px`,
                                        backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`
                                    }} />
                                )}
                                <div className="relative w-full h-full min-h-[300px]">
                                    <Image
                                        src={selectedLogo.src}
                                        alt={selectedLogo.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Footer / Actions */}
                            <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] flex justify-end gap-4">
                                <a
                                    href={selectedLogo.src}
                                    download
                                    className="btn-primary flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Download PNG
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
