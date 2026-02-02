"use client";

import Link from "next/link";

const quickLinks = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "About Rotaract",
        href: "/about",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: "Our Team",
        href: "/team",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        title: "Projects",
        href: "/projects",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
        title: "Brand Center",
        href: "/brand-center",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        title: "Party in Pink",
        href: "https://pip.rotaractjpnagar.org",
        external: true,
    },
];

export default function QuickLinks() {
    return (
        <section className="relative z-20 -mt-16 md:-mt-20">
            <div className="container mx-auto px-4">
                <div className="bg-[var(--bg-elevated)] rounded-xl shadow-xl border border-[var(--border-color)] overflow-hidden">
                    <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[var(--border-color)]">
                        {quickLinks.map((link, index) => {
                            const Component = link.external ? "a" : Link;
                            const externalProps = link.external
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {};

                            return (
                                <Component
                                    key={index}
                                    href={link.href}
                                    {...externalProps}
                                    className="flex flex-col items-center justify-center p-6 text-center hover:bg-[var(--bg-secondary)] transition-colors group h-full"
                                >
                                    <div className="mb-3 text-[var(--rotary-gold)] group-hover:scale-110 transition-transform duration-300">
                                        {link.icon}
                                    </div>
                                    <span className="font-semibold text-[var(--text-primary)]">
                                        {link.title}
                                    </span>
                                </Component>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
