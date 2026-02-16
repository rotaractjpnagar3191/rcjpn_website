"use client";

import { useState } from "react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    from_name: "RCJPN Website Contact",
                    ...formData,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                // Reset status after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                console.error("Form submission failed:", result);
                setStatus("error");
            }
        } catch (error) {
            console.error("Form error:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Side - Info */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                            Get in Touch
                        </h2>

                        <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                            Whether you want to join our club, collaborate on a project, or simply
                            learn more about what we do — we&apos;d love to hear from you.
                        </p>

                        <div className="space-y-4">
                            {/* Email */}
                            <a
                                href="mailto:rotaractjpnagar@gmail.com"
                                className="flex items-center gap-4 p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] hover:border-[var(--rotary-gold)] transition-colors shadow-sm group"
                            >
                                <div className="w-12 h-12 rounded-full bg-[var(--rotary-gold)]/10 flex items-center justify-center text-[var(--rotary-gold)] group-hover:bg-[var(--rotary-gold)] group-hover:text-black transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-[var(--text-muted)]">Email</div>
                                    <div className="font-semibold text-[var(--text-primary)]">rotaractjpnagar@gmail.com</div>
                                </div>
                            </a>

                            {/* Phone */}
                            <a
                                href="tel:+918310404426"
                                className="flex items-center gap-4 p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] hover:border-[var(--rotary-gold)] transition-colors shadow-sm group"
                            >
                                <div className="w-12 h-12 rounded-full bg-[var(--rotary-gold)]/10 flex items-center justify-center text-[var(--rotary-gold)] group-hover:bg-[var(--rotary-gold)] group-hover:text-black transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-[var(--text-muted)]">Phone</div>
                                    <div className="font-semibold text-[var(--text-primary)]">+91 83104 04426</div>
                                </div>
                            </a>

                            {/* Location */}
                            <div className="flex items-center gap-4 p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] shadow-sm group">
                                <div className="w-12 h-12 rounded-full bg-[var(--rotary-gold)]/10 flex items-center justify-center text-[var(--rotary-gold)] group-hover:bg-[var(--rotary-gold)] group-hover:text-black transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-[var(--text-muted)]">Location</div>
                                    <div className="font-semibold text-[var(--text-primary)]">JP Nagar, Bangalore, India</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-[var(--bg-card)] p-6 md:p-8 rounded-2xl shadow-lg border border-[var(--border-color)]">
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Send us a message</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--rotary-gold)] focus:border-transparent transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--rotary-gold)] focus:border-transparent transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--rotary-gold)] focus:border-transparent transition-all resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className={`w-full py-3 px-6 rounded-lg font-bold text-center transition-all duration-300 ${status === "submitting"
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-[var(--rotary-blue)] text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    }`}
                            >
                                {status === "submitting" ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : "Send Message"}
                            </button>

                            {status === "success" && (
                                <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-center animate-fade-in border border-green-200 dark:border-green-800">
                                    <p className="font-semibold">Thank you for reaching out!</p>
                                    <p className="text-sm">We&apos;ll get back to you shortly.</p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
