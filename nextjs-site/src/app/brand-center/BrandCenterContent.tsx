"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type BrandFilter = "all" | "club" | "district" | "theme";
type BackgroundMode = "light" | "dark" | "checker";

const clubLogos = [
    { name: "Cranberry Regular", file: "/images/logos/RaCJPN-Cranberry-Regular.png", category: "club" },
    { name: "Cranberry Simplified", file: "/images/logos/RaCJPN-Cranberry-Simplified.png", category: "club" },
    { name: "Black Regular", file: "/images/logos/RaCJPN-Black-Regular.png", category: "club" },
    { name: "Black Simplified", file: "/images/logos/RaCJPN-Black-Simplified.png", category: "club" },
    { name: "White Regular", file: "/images/logos/RaCJPN-White-Regular.png", category: "club" },
    { name: "White Simplified", file: "/images/logos/RaCJPN-White-Simplified.png", category: "club" },
];

const themeLogos = [
    { name: "Cranberry Unite for Good", file: "/images/logos/RaCJPN-Cranberry-UniteForGood-Regular.png", category: "theme" },
    { name: "Black Unite for Good", file: "/images/logos/RaCJPN-Black-UniteForGood-Regular.png", category: "theme" },
    { name: "White Unite for Good", file: "/images/logos/RaCJPN-White-UniteForGood-Regular.png", category: "theme" },
];

const districtLogos = [
    { name: "District 3191 Masterbrand", file: "/images/logos/district/Rotaract 3191 Masterbrand.png", category: "district" },
    { name: "District 3191 Black", file: "/images/logos/district/Rotaract 3191 Masterbrand - Black.png", category: "district" },
    { name: "District 3191 White", file: "/images/logos/district/Rotaract 3191 Masterbrand - White.png", category: "district" },
    { name: "District 3191 Simplified", file: "/images/logos/district/Rotaract 3191 Masterbrand Simplified.png", category: "district" },
];

const allLogos = [...clubLogos, ...themeLogos, ...districtLogos];

const bgClasses: Record<BackgroundMode, string> = {
    light: "bg-white",
    dark: "bg-gray-900",
    checker: "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Crect%20x%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23ccc%22%2F%3E%3Crect%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23ccc%22%2F%3E%3C%2Fsvg%3E')]",
};

export default function BrandCenterContent() {
    const [filter, setFilter] = useState<BrandFilter>("all");
    const [bgMode, setBgMode] = useState<BackgroundMode>("light");
    const [previewLogo, setPreviewLogo] = useState<string | null>(null);

    const filteredLogos = filter === "all"
        ? allLogos
        : allLogos.filter(logo => logo.category === filter);

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 bg-gradient-to-br from-rotary-navy via-rotary-blue to-rotary-azure">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Brand Center
                        </h1>
                        <p className="text-xl text-white/80 mb-6">
                            Official logos, brand assets, and guidelines for Rotaract JP Nagar and RI District 3191.
                        </p>
                        <nav className="text-sm text-white/60">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">Brand Center</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Controls */}
            <section className="py-8 bg-gray-50 border-b sticky top-0 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { value: "all", label: "All" },
                                { value: "club", label: "Club" },
                                { value: "district", label: "District" },
                                { value: "theme", label: "Theme" },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setFilter(opt.value as BrandFilter)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${filter === opt.value
                                            ? "bg-rotary-blue text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100 border"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {/* Background Toggle */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 mr-2">Preview BG:</span>
                            {[
                                { value: "light", label: "Light" },
                                { value: "dark", label: "Dark" },
                                { value: "checker", label: "Checker" },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setBgMode(opt.value as BackgroundMode)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${bgMode === opt.value
                                            ? "bg-rotary-gold text-black"
                                            : "bg-white text-gray-700 hover:bg-gray-100 border"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredLogos.map((logo, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                            >
                                {/* Logo Preview */}
                                <div className={`aspect-square p-6 flex items-center justify-center ${bgClasses[bgMode]}`}>
                                    <Image
                                        src={logo.file}
                                        alt={logo.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-4 border-t">
                                    <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                                        {logo.name}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize mb-3">
                                        {logo.category}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setPreviewLogo(logo.file)}
                                            className="flex-1 px-3 py-2 text-xs font-medium text-rotary-blue bg-rotary-blue/10 rounded-lg hover:bg-rotary-blue/20 transition-colors"
                                        >
                                            Preview
                                        </button>
                                        <a
                                            href={logo.file}
                                            download
                                            className="flex-1 px-3 py-2 text-xs font-medium text-white bg-rotary-blue rounded-lg hover:bg-rotary-navy transition-colors text-center"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Brand Kits */}
                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Download Brand Kits
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/brand-kit/club-brand-kit.zip"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-rotary-blue text-white font-semibold rounded-lg hover:bg-rotary-navy transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Club Brand Kit
                            </a>
                            <a
                                href="/brand-kit/district-brand-kit.zip"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                District Brand Kit
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preview Modal */}
            {previewLogo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setPreviewLogo(null)}
                >
                    <div className="relative max-w-4xl w-full bg-white rounded-2xl p-8">
                        <button
                            onClick={() => setPreviewLogo(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className={`aspect-video flex items-center justify-center rounded-xl ${bgClasses[bgMode]}`}>
                            <Image
                                src={previewLogo}
                                alt="Logo preview"
                                width={600}
                                height={400}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
