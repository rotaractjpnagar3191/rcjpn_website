"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
    {
        image: "/images/hero/slide-1.webp",
        title: "Rotaract Club of Bangalore JP Nagar",
        subtitle: "Service • Fellowship • Leadership",
        cta1: { label: "Join a Project", href: "/projects" },
        cta2: { label: "Know more", href: "/about" },
    },
    {
        image: "/images/hero/slide-2.webp",
        title: "Grow your leadership",
        subtitle: "Hands-on learning and opportunities to lead.",
        cta1: { label: "Meet the Team", href: "/team" },
        cta2: { label: "Know more", href: "/about" },
    },
    {
        image: "/images/hero/slide-3.webp",
        title: "Create impact with us",
        subtitle: "Rotary's Seven Areas of Focus guide our work.",
        cta1: { label: "Explore focus", href: "/projects" },
        cta2: { label: "Know more", href: "/about" },
    },
];

export default function HeroCarousel() {
    return (
        <section id="hero" className="relative h-screen min-h-[520px] bg-black">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                    el: ".hero-pagination",
                }}
                navigation={{
                    prevEl: ".hero-prev",
                    nextEl: ".hero-next",
                }}
                className="hero-swiper h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        {/* Background Image */}
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            className="object-cover"
                            sizes="100vw"
                            style={{
                                filter: "brightness(0.65) contrast(1.1)",
                            }}
                        />

                        {/* Gradient Overlay for Text Legibility */}
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="container mx-auto px-4 text-center text-white relative z-10 pt-16">
                                <h1
                                    className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight drop-shadow-xl !text-white"
                                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)", color: "white" }}
                                >
                                    {slide.title.includes("JP Nagar") ? (
                                        <>
                                            {slide.title.replace("JP Nagar", "")}
                                            <span className="text-[var(--rotary-gold)]">JP Nagar</span>
                                        </>
                                    ) : (
                                        slide.title
                                    )}
                                </h1>

                                <p
                                    className="text-lg md:text-2xl mb-8 font-medium drop-shadow-md text-white/95"
                                    style={{ color: "white" }}
                                >
                                    {slide.subtitle}
                                </p>

                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                        href={slide.cta1.href}
                                        className="px-8 py-3 bg-[var(--rotary-gold)] text-black font-bold rounded-full hover:bg-yellow-400 transition-transform transform hover:scale-105 shadow-lg border-2 border-[var(--rotary-gold)]"
                                    >
                                        {slide.cta1.label}
                                    </Link>
                                    <Link
                                        href={slide.cta2.href}
                                        className="px-8 py-3 bg-transparent text-white font-bold rounded-full hover:bg-white/10 transition-transform transform hover:scale-105 shadow-lg border-2 border-white"
                                    >
                                        {slide.cta2.label}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Arrows */}
            <button
                className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-all hidden md:flex"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/30 bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-all hidden md:flex"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Pagination */}
            <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2" />
        </section>
    );
}
