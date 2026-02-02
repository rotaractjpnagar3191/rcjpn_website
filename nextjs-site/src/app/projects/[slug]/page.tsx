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
        <main className="min-h-screen bg-[var(--bg-primary)] pb-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px]">
                {project.cover ? (
                    <div className="absolute inset-0">
                        <Image
                            src={project.cover}
                            alt={project.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/70" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--rotary-blue)] to-[var(--rotary-gold)] opacity-90" />
                )}

                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 relative z-10">
                        <Link href="/projects" className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white mb-6 transition-all group">
                            <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span>
                            Back to Projects
                        </Link>
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 text-sm font-semibold bg-[var(--rotary-gold)] text-black rounded-full shadow-md">
                                    {project.categoryLabel}
                                </span>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white shadow-md ${project.status === 'completed' ? 'bg-green-600' :
                                        project.status === 'ongoing' ? 'bg-blue-600' : 'bg-yellow-600'
                                    }`}>
                                    {project.statusLabel}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
                                {project.name}
                            </h1>
                            <div className="flex flex-wrap gap-6 text-white/90 font-medium">
                                {project.startDate && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{formatDate(project.startDate)}</span>
                                    </div>
                                )}
                                {project.venue && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{project.venue}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[var(--bg-card)] rounded-2xl p-8 shadow-xl border border-[var(--border-color)]">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 border-b border-[var(--border-color)] pb-4">
                                Project Description
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-[var(--text-secondary)] whitespace-pre-wrap">
                                {project.description}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-xl border border-[var(--border-color)]">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Impact Stats</h3>
                            <div className="space-y-4">
                                {project.beneficiaryCount > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-[var(--text-secondary)]">Beneficiaries</span>
                                        <span className="font-bold text-[var(--text-primary)] text-lg">{project.beneficiaryCount}</span>
                                    </div>
                                )}
                                {project.participantCount > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-[var(--text-secondary)]">Participants</span>
                                        <span className="font-bold text-[var(--text-primary)] text-lg">{project.participantCount}</span>
                                    </div>
                                )}
                                {project.volunteerCount > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-[var(--text-secondary)]">Volunteers</span>
                                        <span className="font-bold text-[var(--text-primary)] text-lg">{project.volunteerCount}</span>
                                    </div>
                                )}
                                {project.volunteerHours > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-[var(--text-secondary)]">Volunteer Hours</span>
                                        <span className="font-bold text-[var(--text-primary)] text-lg">{project.volunteerHours}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {project.hostClub && (
                            <div className="bg-[var(--bg-card)] rounded-2xl p-6 shadow-xl border border-[var(--border-color)]">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Host Club</h3>
                                <p className="text-[var(--text-secondary)]">{project.hostClub}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
