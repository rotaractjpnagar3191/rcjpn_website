"use client";

import Image from "next/image";
import Link from "next/link";

const teamMembers = [
    {
        name: "Rtn. Rtr. Samarth Viswanath",
        role: "President",
        image: "/images/team/samarth.webp",
    },
    {
        name: "IPP Rtr. Geetanjali A R",
        role: "Immediate Past President",
        image: "/images/team/geetha.webp",
    },
    {
        name: "PP. Rtr. Aishwarya K R",
        role: "Club Advisor",
        image: "/images/team/aishwarya.webp",
    },
    {
        name: "Rtr. Anarghya Suvin",
        role: "Secretary",
        image: "/images/team/anarghya.webp",
    },
    {
        name: "Rtr. Prerana G Sharma",
        role: "Joint Secretary",
        image: "/images/team/prerana.webp",
    },
];

export default function TeamPreview() {
    return (
        <section className="section-padding bg-[var(--bg-primary)]">
            <div className="container mx-auto px-4 md:px-8 text-center">
                <div className="max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Meet Our Leadership
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg">
                        Dedicated individuals leading the club for the Rota Year 2025-26.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center max-w-6xl mx-auto mb-12">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden shadow-md border-4 border-[var(--bg-secondary)] group-hover:border-[var(--rotary-gold)] transition-colors duration-300">
                                <div className="absolute inset-0 bg-gray-200" />
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 160px, 160px"
                                />
                            </div>
                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 leading-tight px-2">
                                {member.name}
                            </h3>
                            <p className="text-[var(--rotary-blue)] text-sm font-medium">
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>

                <Link href="/team" className="btn-secondary">
                    View Full Team
                </Link>
            </div>
        </section>
    );
}
