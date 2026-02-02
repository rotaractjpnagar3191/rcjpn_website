"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
    return (
        <section id="about" className="section-padding bg-[var(--bg-primary)]">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--text-primary)]">
                            Rotaract in JP Nagar
                        </h2>

                        <p className="text-[var(--text-secondary)] mb-6 italic leading-relaxed">
                            Young people driving local impact through service, leadership, and fellowship.
                        </p>

                        <ul className="space-y-4 mb-6">
                            <li className="flex items-start gap-3">
                                <i className="w-5 h-5 flex-shrink-0 text-[var(--rotary-blue)] mt-1">
                                    <svg fill="currentColor" viewBox="0 0 16 16"><path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" /><path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" /></svg>
                                </i>
                                <span className="text-[var(--text-secondary)]">
                                    <strong>Community:</strong> Hands-on projects responding to local needs in health, education, and environment.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="w-5 h-5 flex-shrink-0 text-[var(--rotary-blue)] mt-1">
                                    <svg fill="currentColor" viewBox="0 0 16 16"><path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" /><path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" /></svg>
                                </i>
                                <span className="text-[var(--text-secondary)]">
                                    <strong>Leadership:</strong> Learning by doing—organizing events, leading teams, and public speaking.
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="w-5 h-5 flex-shrink-0 text-[var(--rotary-blue)] mt-1">
                                    <svg fill="currentColor" viewBox="0 0 16 16"><path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" /><path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" /></svg>
                                </i>
                                <span className="text-[var(--text-secondary)]">
                                    <strong>Network:</strong> Part of Rotary District 3191, connecting with mentors and peers across Bangalore and the world.
                                </span>
                            </li>
                        </ul>

                        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                            We meet regularly in JP Nagar to plan service initiatives and build friendships.
                            Open to students and young professionals (18+).
                        </p>

                        <Link href="/about" className="btn-primary">
                            Read Our Story
                        </Link>
                    </div>

                    {/* Image Side */}
                    <div className="order-1 lg:order-2 flex justify-center">
                        <Image
                            src="/images/logos/RaCJPN-Cranberry-UniteForGood-Regular.png"
                            alt="Rotaract Club of Bangalore JP Nagar"
                            width={500}
                            height={500}
                            className="w-full max-w-md h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
