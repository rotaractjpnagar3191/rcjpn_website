import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="relative text-center max-w-lg">
                {/* 404 Number */}
                <div className="text-[120px] md:text-[180px] font-black leading-none text-gradient opacity-20">
                    404
                </div>

                {/* Content */}
                <div className="-mt-16 md:-mt-24 relative">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/" className="btn-primary">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go Home
                        </Link>
                        <Link href="/#contact" className="btn-secondary">
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-[var(--glass-border)]">
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                        Or try these pages:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { href: "/about", label: "About" },
                            { href: "/projects", label: "Projects" },
                            { href: "/team", label: "Team" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-[var(--text-secondary)] hover:text-[var(--rotary-gold)] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
