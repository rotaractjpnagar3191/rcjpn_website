// Server-only utilities for CSV parsing
import Papa from "papaparse";
import { readFileSync } from "fs";
import { join } from "path";
import type { Project, ProjectCategory, ProjectStatus } from "./projects";

interface CsvRow {
    ID?: string;
    Name?: string;
    Description?: string;
    Venue?: string;
    "Start Date"?: string;
    "End Date"?: string;
    "Avenues of Service"?: string;
    Status?: string;
    "Cover Photo"?: string;
    Photos?: string;
    "Participant Count"?: string;
    "Benificiary Count"?: string;
    "Volunteer Count"?: string;
    "Volunteer Hours"?: string;
    "Areas of Focus"?: string;
    "Host Club"?: string;
}

function mapCategory(value: string): [ProjectCategory, string] {
    const s = (value || "").toLowerCase();
    if (s.includes("community")) return ["community", "Community Service"];
    if (s.includes("club")) return ["club", "Club Service"];
    if (s.includes("professional")) return ["professional", "Professional Dev"];
    if (s.includes("international")) return ["international", "International"];
    if (s.includes("fellow")) return ["fellowship", "Fellowship"];
    if (s.includes("public")) return ["public-image", "Public Image"];
    return ["other", value || "Other"];
}

function slugify(str: string): string {
    return (str || "project")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "project";
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
}

export function getProjects(): Project[] {
    const csvPath = join(process.cwd(), "src/data/projects-2025-26.csv");
    const csv = readFileSync(csvPath, "utf-8");
    const { data } = Papa.parse<CsvRow>(csv, {
        header: true,
        skipEmptyLines: true,
    });

    const projects: Project[] = data.map((row) => {
        const name = row.Name || row["Name"] || "Untitled Project";
        const [category, categoryLabel] = mapCategory(
            row["Avenues of Service"] || ""
        );

        const statusRaw = (row.Status || "").toLowerCase();
        const status: ProjectStatus = ["upcoming", "ongoing", "completed"].includes(
            statusRaw
        )
            ? (statusRaw as ProjectStatus)
            : "completed";

        const statusLabel =
            status === "completed"
                ? "Completed"
                : status === "ongoing"
                    ? "Ongoing"
                    : "Upcoming";

        let cover = row["Cover Photo"] || "";
        if (cover.includes(",") || cover.includes(";")) {
            cover = cover.split(/[;,]/)[0].trim();
        }

        const photos = (row.Photos || "")
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);

        return {
            id: row.ID || slugify(name),
            name,
            slug: slugify(name),
            description: row.Description || "",
            venue: row.Venue || "",
            startDate: row["Start Date"] || "",
            endDate: row["End Date"] || "",
            category,
            categoryLabel,
            status,
            statusLabel,
            cover,
            photos,
            participantCount: parseInt(row["Participant Count"] || "0", 10),
            beneficiaryCount: parseInt(row["Benificiary Count"] || "0", 10),
            volunteerCount: parseInt(row["Volunteer Count"] || "0", 10),
            volunteerHours: parseInt(row["Volunteer Hours"] || "0", 10),
            areasOfFocus: (row["Areas of Focus"] || "")
                .split(",")
                .map((a) => a.trim())
                .filter(Boolean),
            hostClub: row["Host Club"] || "",
        };
    });

    // Sort by date (newest first)
    return projects.sort((a, b) => {
        const dateA = parseDate(a.startDate)?.getTime() || 0;
        const dateB = parseDate(b.startDate)?.getTime() || 0;
        return dateB - dateA;
    });
}

export function getLatestCompletedProjects(count = 3): Project[] {
    return getProjects()
        .filter((p) => p.status === "completed")
        .slice(0, count);
}
