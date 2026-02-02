import { Metadata } from "next";
import BrandCenterClient from "./BrandCenterClient";

export const metadata: Metadata = {
    title: "Brand Center",
    description: "Official logos & usage — Club (JP Nagar) and District 3191.",
};

export default function BrandCenterPage() {
    return (
        <main className="bg-[var(--bg-primary)]">
            {/* Page Title */}
            <section className="relative pt-32 pb-12 bg-[var(--bg-secondary)] text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                        Brand Center
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)]">
                        Official logos & usage — Club (JP Nagar) and District 3191
                    </p>
                </div>
            </section>

            <BrandCenterClient />
        </main>
    );
}
