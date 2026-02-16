import { getProjects } from "@/lib/projects.server";
import { formatDate } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const projects = getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const projects = getProjects();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[var(--bg-primary)] pb-12 md:pb-20">
            {/* Hero Section - Mobile optimized height */}
            <section className="relative h-[45vh] min-h-[320px] md:h-[50vh] md:min-h-[400px]">
                {project.cover ? (
                    <div className="absolute inset-0">
                        <Image
                            src={project.cover}
                            alt={project.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--rotary-blue)] to-[var(--rotary-gold)] opacity-90" />
                )}

                {/* Hero content - positioned at bottom */}
                <div className="absolute inset-0 flex items-end pb-8 md:pb-12">
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-4xl">
                            {/* Breadcrumb */}
                            <Link 
                                href="/projects" 
                                className="inline-flex items-center gap-1.5 text-sm mb-4 opacity-80 hover:opacity-100 transition-opacity group"
                                style={{ color: '#ffffff' }}
                            >
                                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span>Projects</span>
                                <span className="mx-1.5">/</span>
                                <span className="opacity-60 truncate max-w-[150px] md:max-w-[250px]">Details</span>
                            </Link>
                            <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                                <span className="px-2.5 py-1 text-xs md:text-sm font-semibold bg-[var(--rotary-gold)] text-black rounded-full shadow-md">
                                    {project.categoryLabel}
                                </span>
                                <span className={`px-2.5 py-1 text-xs md:text-sm font-semibold rounded-full shadow-md ${project.status === 'completed' ? 'bg-green-600' :
                                        project.status === 'ongoing' ? 'bg-blue-600' : 'bg-yellow-600'
                                    }`} style={{ color: '#ffffff' }}>
                                    {project.statusLabel}
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight" style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8)' }}>
                                {project.name}
                            </h1>
                            <div className="flex flex-wrap gap-3 md:gap-6 text-sm md:text-base font-medium" style={{ color: '#ffffff', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
                                {project.startDate && (
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{formatDate(project.startDate)}</span>
                                    </div>
                                )}
                                {project.venue && (
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="truncate max-w-[200px] md:max-w-none">{project.venue}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 md:px-6 relative z-20 pt-6 md:pt-8">
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        <div className="bg-[var(--bg-card)] rounded-xl md:rounded-2xl p-5 md:p-8 shadow-xl border border-[var(--border-color)]">
                            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 md:mb-4 border-b border-[var(--border-color)] pb-3 md:pb-4">
                                Project Description
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                {project.description}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats - Shows as horizontal grid on mobile, vertical on desktop */}
                    <div className="space-y-4 md:space-y-6 order-first lg:order-last">
                        <div className="bg-[var(--bg-card)] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-[var(--border-color)]">
                            <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-4 md:mb-6">Impact Stats</h3>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-4">
                                {project.beneficiaryCount > 0 && (
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-0 bg-[var(--bg-secondary)] md:bg-transparent rounded-lg md:rounded-none">
                                        <span className="text-xs md:text-base text-[var(--text-secondary)] mb-1 md:mb-0">Beneficiaries</span>
                                        <span className="font-bold text-[var(--text-primary)] text-lg md:text-lg">{project.beneficiaryCount}</span>
                                    </div>
                                )}
                                {project.participantCount > 0 && (
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-0 bg-[var(--bg-secondary)] md:bg-transparent rounded-lg md:rounded-none">
                                        <span className="text-xs md:text-base text-[var(--text-secondary)] mb-1 md:mb-0">Participants</span>
                                        <span className="font-bold text-[var(--text-primary)] text-lg md:text-lg">{project.participantCount}</span>
                                    </div>
                                )}
                                {project.volunteerCount > 0 && (
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-0 bg-[var(--bg-secondary)] md:bg-transparent rounded-lg md:rounded-none">
                                        <span className="text-xs md:text-base text-[var(--text-secondary)] mb-1 md:mb-0">Volunteers</span>
                                        <span className="font-bold text-[var(--text-primary)] text-lg md:text-lg">{project.volunteerCount}</span>
                                    </div>
                                )}
                                {project.volunteerHours > 0 && (
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-0 bg-[var(--bg-secondary)] md:bg-transparent rounded-lg md:rounded-none">
                                        <span className="text-xs md:text-base text-[var(--text-secondary)] mb-1 md:mb-0">Volunteer Hours</span>
                                        <span className="font-bold text-[var(--text-primary)] text-lg md:text-lg">{project.volunteerHours}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {project.hostClub && (
                            <div className="bg-[var(--bg-card)] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-[var(--border-color)]">
                                <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] mb-1 md:mb-2">Host Club</h3>
                                <p className="text-sm md:text-base text-[var(--text-secondary)]">{project.hostClub}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
