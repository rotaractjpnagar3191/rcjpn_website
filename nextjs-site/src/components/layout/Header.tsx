"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/team", label: "Team" },
    { href: "/brand-center", label: "Brand Center" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    // Determine header appearance based on:
    // 1. Route: Home page ("/") has a dark hero image, requiring white text initially.
    //           Inner pages (e.g. /about) have white backgrounds, requiring dark text initially.
    // 2. Scroll: When scrolled, header becomes solid white (or dark in dark mode) with contrasting text.

    const isHomePage = pathname === "/";
    const isTransparent = !isScrolled;

    // Force white text ONLY when on Home Page AND at the top (Transparent header over dark hero).
    // In all other cases (Scrolled OR Inner Page), let the Theme Provider handle the transparency/contrast.
    const useWhiteText = isTransparent && isHomePage;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-[var(--bg-primary)] shadow-md py-3"
                : "bg-transparent py-4 md:py-6"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo - Restored Larger Size */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-14 w-48 md:h-20 md:w-64 transition-all duration-300">
                            <Image
                                src={
                                    useWhiteText || theme === "dark"
                                        ? "/images/logos/RaCJPN-White-UniteForGood-Regular.png"
                                        : "/images/logos/RaCJPN-Cranberry-UniteForGood-Regular.png"
                                }
                                alt="Rotaract JP Nagar"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm md:text-base font-semibold transition-colors ${useWhiteText ? "hover:text-yellow-400 drop-shadow-sm" : "hover:text-[var(--rotary-gold)]"
                                    }`}
                                style={{
                                    color: isActive(link.href)
                                        ? (useWhiteText ? '#F7B32B' : 'var(--rotary-gold)')
                                        : (useWhiteText ? '#ffffff' : 'var(--text-primary)')
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <a
                            href="https://pip.rotaractjpnagar.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm md:text-base font-semibold transition-colors ${useWhiteText
                                ? "text-white hover:text-yellow-400 drop-shadow-sm"
                                : "text-[var(--text-primary)] hover:text-[var(--rotary-gold)]"
                                }`}
                            style={{ color: useWhiteText ? '#ffffff' : 'var(--text-primary)' }}
                        >
                            Party in Pink
                        </a>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-colors ${useWhiteText
                                ? "hover:bg-white/10 text-white"
                                : "hover:bg-gray-100 dark:hover:bg-white/10 text-[var(--text-primary)]"
                                }`}
                            aria-label="Toggle theme"
                        >
                            {theme === "light" ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>

                        <Link
                            href="/#contact"
                            className={`btn-primary text-sm px-6 py-2 shadow-sm font-bold tracking-wide ${useWhiteText ? "bg-white text-black hover:bg-gray-100 border-none" : ""
                                }`}
                        >
                            Contact Us
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2"
                    >
                        <svg
                            className="w-8 h-8"
                            style={{ color: useWhiteText ? '#ffffff' : 'var(--text-primary)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[var(--bg-primary)] border-t border-[var(--border-color)] shadow-lg lg:hidden p-4">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-lg font-medium p-2 rounded-lg ${isActive(link.href)
                                    ? "bg-[var(--bg-secondary)] text-[var(--rotary-gold)]"
                                    : "text-[var(--text-primary)]"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href="https://pip.rotaractjpnagar.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium p-2 rounded-lg text-[var(--text-primary)]"
                        >
                            Party in Pink
                        </a>
                        <hr className="border-[var(--border-color)]" />
                        <div className="flex items-center justify-between p-2">
                            <span className="text-[var(--text-primary)] font-medium">Dark Mode</span>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                            >
                                {theme === "light" ? "🌙" : "☀️"}
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
