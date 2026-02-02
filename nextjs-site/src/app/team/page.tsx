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
    {
        name: "PP. Rtn. Rtr. Karthik U Chikmath",
        role: "Club Mentor",
        image: "/images/team/Karthik_Chikmath.jpeg",
    },
    {
        name: "PP. Rtr. Rtn. Adishesha Sairam",
        role: "Club Mentor & Chair – TRF and Service Projects",
        image: "/images/team/Adishesha_Sairam_KB.jpeg",
    },
    {
        name: "Rtr. Akshatha PB",
        role: "Mentor – Club Service",
        image: "/images/team/Akshatha_PB.jpeg",
    },
    {
        name: "Rtr. Aishwarya",
        role: "Director – Club Service",
        image: "/images/team/Aishu Gowda1702.jpeg",
    },
    {
        name: "Rtr. Girish A R",
        role: "Director – Club Service",
        image: "/images/team/Girish_A_R.jpeg",
    },
    {
        name: "Rtr. Varsha Ramdas",
        role: "Mentor – Community Service",
        image: "/images/team/Varsha Ramdas (1).jpg",
    },
    {
        name: "Rtr. Roopashree HS",
        role: "Director – Community Service",
        image: "/images/team/Roopashree HS.jpeg",
    },
    {
        name: "Rtr. Brinda V",
        role: "Director – Community Service",
        image: "/images/team/Brinda V.jpeg",
    },
    {
        name: "Rtr. Niranjan Aithal",
        role: "Mentor – Professional Development",
        image: "/images/team/Niranjan_K.jpg",
    },
    {
        name: "Rtr. Vignesh V",
        role: "Director – Professional Development",
        image: "/images/team/Vignesh_V.JPG",
    },
    {
        name: "Rtr. Sanjana G Sharma",
        role: "Director – Professional Development",
        image: "/images/team/Rtr._Sanjana_Sharma.jpg",
    },
    {
        name: "Rtr. Karthik JP",
        role: "Mentor – International Service",
        image: "/images/team/Karthik Jp.jpeg",
    },
    {
        name: "Rtr. Sarthak Lalwani",
        role: "Director – International Service",
        image: "/images/team/Sarthak Lalwani.jpg",
    },
    {
        name: "Rtr. Srinidhi Vanamamalai",
        role: "Director – International Service",
        image: "/images/team/Srinidhi_Vanamamalai.jpg",
    },
    {
        name: "Rtr. Srinivas Iyengar",
        role: "Mentor – Design & PR",
        image: "/images/team/Srinivas_Iyengar.jpeg",
    },
    {
        name: "Rtr. Balaji D S",
        role: "Director – Design & PR",
        image: "/images/team/BALAJI.jpg",
    },
    {
        name: "Rtr. Niteshwar S",
        role: "Director – Design & PR",
        image: "/images/team/Niteshwar.jpg",
    },
    {
        name: "Rtr. Adithya N",
        role: "Club Editor",
        image: "/images/team/Adithya_N.jpg",
    },
    {
        name: "Rtr. Niranjan J",
        role: "Treasurer & Chair – Fellowship Group (The Game Changers)",
        image: "/images/team/J Niranjan.jpg",
    },
    {
        name: "Rtr. Vijay V",
        role: "Sergeant-at-Arms",
        image: "/images/team/VIJAY V.jpg",
    },
    {
        name: "Rtr. Ganadhip R",
        role: "Chair – Fellowship Group (The Trailblazers)",
        image: "/images/team/Ganadhip_R.jpeg",
    },
    {
        name: "Rtr. Krishna Daga",
        role: "Chair – Fellowship Group (The Storytellers)",
        image: "/images/team/Krishna Daga.jpg",
    },
];

export default function TeamPage() {
    return (
        <main className="bg-[var(--bg-primary)]">
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[var(--bg-secondary)] overflow-hidden">
                <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
                        Our Team
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)]">
                        Rotaract Club of Bangalore JP Nagar — RY 2025–26
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[var(--text-muted)]">
                        <Link href="/" className="hover:text-[var(--rotary-blue)] transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span>Team</span>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="section-padding">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                            Leadership & Members
                        </h2>
                        <p className="text-[var(--text-secondary)] mt-2">
                            One united team
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-[var(--border-color)]">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                </div>
                                <h3 className="font-bold text-[var(--text-primary)] text-lg mb-1 leading-tight">
                                    {member.name}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[var(--bg-secondary)] text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                        Want to join us?
                    </h2>
                    <Link href="/brand-center" className="btn-primary">
                        Get Involved
                    </Link>
                </div>
            </section>
        </main>
    );
}
