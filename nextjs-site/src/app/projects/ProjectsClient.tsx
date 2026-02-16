"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, getProjectCategories, getProjectStatuses, formatDate } from "@/lib/projects";

interface ProjectsClientProps {
    projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const categories = getProjectCategories();
    const statuses = getProjectStatuses();

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const categoryMatch = selectedCategory === "all" || project.category === selectedCategory;
            const statusMatch = selectedStatus === "all" || project.status === selectedStatus;
            return categoryMatch && statusMatch;
        });
    }, [projects, selectedCategory, selectedStatus]);

    // Handle scroll lock when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [selectedProject]);

    return (
        <main className="bg-[var(--bg-primary)]">
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial pointer-events-none opacity-50" />
                <div className="absolute inset-0 bg-grid opacity-10" />

                <div className="container mx-auto px-4 md:px-8 relative">
                    <div className="max-w-3xl">
                        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
                            <Link href="/" className="hover:text-[var(--rotary-gold)] transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-[var(--text-primary)]">Projects</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
                            Our <span className="text-gradient">Projects</span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                            Community service initiatives making real impact in Bangalore and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-4 md:py-8 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:items-center md:justify-between">
                        {/* Category Filters - Horizontal scroll on mobile */}
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value)}
                                    className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${selectedCategory === cat.value
                                        ? "bg-[var(--rotary-gold)] text-black shadow-md"
                                        : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--rotary-blue)]"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Status Filters */}
                        <div className="flex gap-2 flex-shrink-0">
                            {statuses.map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => setSelectedStatus(status.value)}
                                    className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all ${selectedStatus === status.value
                                        ? "bg-[var(--rotary-gold)] text-black shadow-md"
                                        : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--rotary-blue)]"
                                        }`}
                                >
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-8">
                    {filteredProjects.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => setSelectedProject(project)}
                                    className="block h-full group cursor-pointer"
                                >
                                    <article
                                        className="h-full bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            {project.cover ? (
                                                <Image
                                                    src={project.cover}
                                                    alt={project.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--rotary-gold)]/20 to-[var(--accent-orange)]/20 flex items-center justify-center">
                                                    <svg className="w-16 h-16 text-[var(--rotary-gold)]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Badges */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 text-xs font-semibold bg-black/70 backdrop-blur-sm text-white rounded-full border border-white/10 shadow-sm">
                                                    {project.categoryLabel}
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm shadow-sm ${project.status === "completed"
                                                    ? "bg-green-100 text-green-800 border border-green-200"
                                                    : project.status === "ongoing"
                                                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                                                        : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                                    }`}>
                                                    {project.statusLabel}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="font-bold text-xl text-[var(--text-primary)] mb-3 group-hover:text-[var(--rotary-blue)] transition-colors">
                                                {project.name}
                                            </h3>
                                            <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-2 flex-grow">
                                                {project.description}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border-color)] mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {formatDate(project.startDate)}
                                                </div>
                                                <div className="flex items-center gap-1 group-hover:text-[var(--rotary-blue)] transition-colors font-semibold">
                                                    <span>View Details</span>
                                                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                                <svg className="w-10 h-10 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No projects found</h3>
                            <p className="text-[var(--text-secondary)]">
                                Try adjusting your filters to see more projects.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 min-h-screen box-border"
                >
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in duration-200"
                        onClick={() => setSelectedProject(null)}
                    />

                    {/* Modal Content - Full screen on mobile, centered on desktop */}
                    <div
                        className="bg-[var(--bg-card)] w-full md:max-w-4xl h-[95vh] md:h-auto md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl shadow-2xl relative animate-zoom-in duration-300 z-10 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Image */}
                        <div className="relative h-48 sm:h-64 md:h-80 w-full flex-shrink-0">
                            {selectedProject.cover ? (
                                <>
                                    <Image
                                        src={selectedProject.cover}
                                        alt={selectedProject.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--rotary-blue)] to-[var(--rotary-gold)]" />
                            )}

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            {/* Badge & Title */}
                            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
                                    <span className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-bold bg-[var(--rotary-gold)] text-black rounded-full shadow-sm">{selectedProject.categoryLabel}</span>
                                    <span className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-bold bg-gray-800/80 backdrop-blur-md border border-white/20 rounded-full shadow-sm uppercase tracking-wide" style={{ color: '#ffffff' }}>{selectedProject.statusLabel}</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight" style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.7)' }}>{selectedProject.name}</h2>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 flex-1 overflow-y-auto">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 pb-6 md:pb-8 border-b border-[var(--border-color)]">
                                <div className="p-3 md:p-4 bg-[var(--bg-secondary)] rounded-lg md:rounded-xl text-center">
                                    <div className="text-lg md:text-2xl font-bold text-[var(--rotary-blue)]">{selectedProject.beneficiaryCount || "-"}</div>
                                    <div className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Beneficiaries</div>
                                </div>
                                <div className="p-3 md:p-4 bg-[var(--bg-secondary)] rounded-lg md:rounded-xl text-center">
                                    <div className="text-lg md:text-2xl font-bold text-[var(--rotary-gold)]">{selectedProject.volunteerCount || "-"}</div>
                                    <div className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Volunteers</div>
                                </div>
                                <div className="p-3 md:p-4 bg-[var(--bg-secondary)] rounded-lg md:rounded-xl text-center">
                                    <div className="text-lg md:text-2xl font-bold text-[var(--text-primary)]">{selectedProject.volunteerHours || "-"}</div>
                                    <div className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Hours</div>
                                </div>
                                <div className="p-3 md:p-4 bg-[var(--bg-secondary)] rounded-lg md:rounded-xl text-center">
                                    <div className="text-sm md:text-md font-bold text-[var(--text-primary)]">{formatDate(selectedProject.startDate)}</div>
                                    <div className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-0.5">Date</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] mb-2 md:mb-3">About the Project</h3>
                                <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)] text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                                    {selectedProject.description}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions - Sticky on mobile */}
                        <div className="flex justify-between items-center gap-3 p-4 md:p-6 border-t border-[var(--border-color)] bg-[var(--bg-card)] sticky bottom-0">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                Close
                            </button>
                            <Link
                                href={`/projects/${selectedProject.slug}`}
                                className="btn-primary text-sm px-4 md:px-6 py-2"
                            >
                                View Full Details
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
