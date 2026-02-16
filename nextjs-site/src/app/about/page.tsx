import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us | Rotaract Bangalore JP Nagar",
    description:
        "Learn about Rotaract Club of Bangalore JP Nagar - a youth-led Rotary organization providing community service, fellowship, networking, and leadership opportunities in South Bengaluru.",
    keywords: [
        "About Rotaract",
        "Rotaract Bangalore",
        "youth organization Bengaluru",
        "community service club",
        "Rotary youth",
    ],
};

const areasOfFocus = [
    {
        icon: "🛡️",
        title: "Promoting Peace",
        description: "Dialogue, empathy, and conflict resolution for resilient communities.",
        color: "from-blue-500/20 to-blue-600/20",
    },
    {
        icon: "❤️",
        title: "Fighting Disease",
        description: "Prevention, awareness, and access to healthcare through local initiatives.",
        color: "from-red-500/20 to-red-600/20",
    },
    {
        icon: "💧",
        title: "Clean Water & Sanitation",
        description: "WASH projects that improve public health outcomes.",
        color: "from-cyan-500/20 to-cyan-600/20",
    },
    {
        icon: "🏥",
        title: "Saving Mothers & Children",
        description: "Nutrition, prenatal care, and immunization support for healthier families.",
        color: "from-pink-500/20 to-pink-600/20",
    },
    {
        icon: "🎓",
        title: "Supporting Education",
        description: "Access to learning, literacy, and skill-building for students and youth.",
        color: "from-purple-500/20 to-purple-600/20",
    },
    {
        icon: "💼",
        title: "Growing Local Economies",
        description: "Entrepreneurship, employability, and sustainable development.",
        color: "from-green-500/20 to-green-600/20",
    },
    {
        icon: "🌿",
        title: "Protecting the Environment",
        description: "Tree planting, waste management, and climate action initiatives.",
        color: "from-emerald-500/20 to-emerald-600/20",
    },
];

export default function AboutPage() {
    return (
        <main className="bg-[var(--bg-primary)]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
                <div className="absolute inset-0 bg-grid opacity-20" />

                <div className="container mx-auto px-4 md:px-8 relative">
                    <div className="max-w-3xl">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
                            <Link href="/" className="hover:text-[var(--rotary-gold)] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-[var(--text-primary)]">About</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
                            About <span className="text-gradient">Us</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            Service • Fellowship • Impact — building stronger communities
                            in JP Nagar and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Rotaract Section */}
            <section className="py-20 md:py-32 bg-[var(--bg-secondary)]">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image */}
                        <div className="flex justify-center">
                            <Image
                                src="/images/logos/Rotaract Masterbrand.png"
                                alt="Rotaract Masterbrand Logo"
                                width={400}
                                height={400}
                                className="w-full max-w-sm h-auto"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--rotary-gold)]" />
                                <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                                    The Movement
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                                About Rotaract
                            </h2>

                            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                                Rotaract brings together young people (18+) to take action through
                                service, develop leadership skills, and build friendships across the world.
                            </p>

                            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                                In 2019, Rotary&apos;s{" "}
                                <a
                                    href="https://www.rotary.org/en/rotaract-rising"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--rotary-gold)] hover:underline"
                                >
                                    Council on Legislation
                                </a>{" "}
                                elevated Rotaract to a distinct type of Rotary membership —
                                strengthening its voice and impact globally.
                            </p>

                            <ul className="space-y-3">
                                {[
                                    "Leadership through hands-on projects and club roles",
                                    "Global network within the Rotary family of programs",
                                    "Service that creates lasting change locally and globally",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-[var(--text-primary)]">
                                        <span className="text-[var(--rotary-gold)] mt-1">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* About JP Nagar Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Content */}
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--rotary-gold)]" />
                                <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                                    Our Club
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                                About Rotaract JP Nagar
                            </h2>

                            <p className="text-[var(--text-secondary)] mb-4 italic leading-relaxed">
                                We&apos;re a youth-led club in South Bengaluru. We learn by doing—serving
                                our neighbourhoods, building leadership, and making friendships that last.
                            </p>

                            <ul className="space-y-4 mb-6">
                                {[
                                    "Community service responding to local needs in education, health, environment, and inclusion",
                                    "Leadership & professional growth through project ownership and mentorship",
                                    "Inclusive, welcoming culture—students and young professionals (18+) are all invited",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-lg bg-[var(--rotary-gold)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4 text-[var(--rotary-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-[var(--text-primary)]">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Based in JP Nagar with members across South Bengaluru, we run regular
                                service drives, skill-building workshops, and fellowship events.
                                If you want to create visible, measurable change—this is your place.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                                <Image
                                    src="/images/hero/slide-2.webp"
                                    alt="Rotaract JP Nagar members"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 rounded-3xl border border-[var(--glass-border)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seven Areas of Focus */}
            <section className="py-20 md:py-32 bg-[var(--bg-secondary)]">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--rotary-gold)]" />
                            <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                                Our Mission
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                            Rotary&apos;s Seven <span className="text-gradient">Areas of Focus</span>
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            What we champion through Rotaract
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {areasOfFocus.map((area, index) => (
                            <div
                                key={index}
                                className="glass-card p-6 text-center group"
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                                    {area.icon}
                                </div>
                                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{area.title}</h3>
                                <p className="text-sm text-[var(--text-muted)]">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

                <div className="container mx-auto px-4 md:px-8 text-center relative">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                        Ready to Make an Impact?
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
                        Join us in creating positive change in our community. Whether you want to
                        volunteer, collaborate, or simply learn more—we&apos;d love to connect!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/#contact" className="btn-primary">
                            Get in Touch
                        </Link>
                        <Link href="/projects" className="btn-secondary">
                            View Our Projects
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
