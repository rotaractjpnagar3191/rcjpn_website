// Types for projects - safe for both client and server
export type ProjectCategory =
  | "community"
  | "club"
  | "professional"
  | "international"
  | "fellowship"
  | "public-image"
  | "other";

export type ProjectStatus = "upcoming" | "ongoing" | "completed";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  venue: string;
  startDate: string;
  endDate: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: ProjectStatus;
  statusLabel: string;
  cover: string;
  photos: string[];
  participantCount: number;
  beneficiaryCount: number;
  volunteerCount: number;
  volunteerHours: number;
  areasOfFocus: string[];
  hostClub: string;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getProjectCategories(): { value: ProjectCategory | "all"; label: string }[] {
  return [
    { value: "all", label: "All" },
    { value: "community", label: "Community Service" },
    { value: "club", label: "Club Service" },
    { value: "professional", label: "Professional Dev" },
    { value: "international", label: "International" },
    { value: "fellowship", label: "Fellowship" },
    { value: "public-image", label: "Public Image" },
  ];
}

export function getProjectStatuses(): { value: ProjectStatus | "all"; label: string }[] {
  return [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "ongoing", label: "Ongoing" },
    { value: "upcoming", label: "Upcoming" },
  ];
}
