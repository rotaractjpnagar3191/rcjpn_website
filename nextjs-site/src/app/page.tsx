import { getLatestCompletedProjects } from "@/lib/projects.server";
import HeroCarousel from "@/components/home/HeroCarousel";
import QuickLinks from "@/components/home/QuickLinks";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import TeamPreview from "@/components/home/TeamPreview";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  // Get 3 latest completed projects from CSV
  const latestProjects = getLatestCompletedProjects(3);

  return (
    <main className="bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Quick Links - Bento Grid */}
      <QuickLinks />

      {/* About Section */}
      <AboutSection />

      {/* Featured Projects */}
      <FeaturedProjects projects={latestProjects} />

      {/* Team Preview */}
      <TeamPreview />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
