import { Metadata } from "next";
import { getProjects } from "@/lib/projects.server";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
    title: "Projects | Community Service Initiatives",
    description:
        "Explore Rotaract Club of Bangalore JP Nagar's community service projects. From health camps to environmental drives, see how we're making an impact in Bengaluru.",
    keywords: [
        "Rotaract projects",
        "community service Bangalore",
        "volunteer projects Bengaluru",
        "social impact Karnataka",
        "youth service initiatives",
    ],
};

export default function ProjectsPage() {
    const projects = getProjects();

    return <ProjectsClient projects={projects} />;
}
