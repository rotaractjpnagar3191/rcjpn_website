"use client";

import Image from "next/image";
import Link from "next/link";
import { Project, formatDate } from "@/lib/projects";

interface FeaturedProjectsProps {
    projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    return (
        <section id="projects" className="section-padding bg-[var(--bg-secondary)]">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                            Recent Projects
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
                            See how we are making a difference in our community through service and fellowship.
                        </p>
                    </div>
                    <Link
                        href="/projects"
                        className="btn-secondary whitespace-nowrap"
                    >
                        View All Projects
                    </Link>
                </div>

                {projects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.slug}`} className="block h-full group">
                                <article className="h-full bg-[var(--bg-card)] rounded-xl overflow-hidden border border-[var(--border-color)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden">
                                        {project.cover ? (
                                            <Image
                                                src={project.cover}
                                                alt={project.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-secondary)]">
                                                <svg className="w-12 h-12 text-[var(--text-muted)] opacity-20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="px-3 py-1 text-xs font-semibold bg-black/70 backdrop-blur text-white rounded-full shadow-md border border-white/10">
                                                {project.categoryLabel}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide ${project.status === 'upcoming' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                                project.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                                }`}>
                                                {project.statusLabel}
                                            </span>
                                            <span className="text-sm text-[var(--text-muted)]">
                                                {formatDate(project.startDate)}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--rotary-blue)] transition-colors line-clamp-2">
                                            {project.name}
                                        </h3>

                                        <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-3 flex-grow">
                                            {project.description || "Community service initiative by Rotaract JP Nagar."}
                                        </p>

                                        <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-sm text-[var(--text-muted)]">
                                            {project.volunteerHours > 0 ? (
                                                <span>{project.volunteerHours} Volunteer Hours</span>
                                            ) : <span></span>}
                                            <span className="group-hover:translate-x-1 transition-transform text-[var(--rotary-blue)] font-medium">
                                                Read More →
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)]">
                        <p className="text-[var(--text-secondary)]">Projects loading or coming soon...</p>
                    </div>
                )}
            </div>
        </section>
    );
}
