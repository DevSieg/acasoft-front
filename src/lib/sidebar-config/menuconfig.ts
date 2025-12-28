import { NavItem, ProjectItem, TeamItem } from "@/types/sidebar"
import { AudioWaveform, ChartNoAxesCombined, Command, FolderCog, GalleryVerticalEnd, GraduationCap, NotebookTabs } from "lucide-react"

export const BASE_NAV: NavItem[] = [
    {
        title: "Gestión general",
        url: "#",
        icon: FolderCog,
        isActive: true,
        requiredRoles: ["ADMIN", "MANAGER"], // 👈 solo para estos roles
        items: [
            { title: "Trabajadores", url: "#", requiredRoles: ["ADMIN"] },
            { title: "Usuarios", url: "#", requiredRoles: ["ADMIN"] },
            { title: "Roles", url: "#", requiredRoles: ["ADMIN"] },
            { title: "Sedes", url: "#", requiredRoles: ["ADMIN", "MANAGER"] },
        ],
    },
    {
        title: "Gestión curricular",
        url: "#",
        icon: NotebookTabs,
        requiredRoles: ["USER", "MANAGER", "ADMIN"],
        items: [
            { title: "Docentes", url: "#", requiredRoles: ["USER", "MANAGER", "ADMIN"] },
            { title: "Áreas", url: "#", requiredRoles: ["MANAGER", "ADMIN"] },
            { title: "Carreras", url: "#", requiredRoles: ["MANAGER", "ADMIN"] },
        ],
    },
    {
        title: "Gestión académica",
        url: "#",
        icon: GraduationCap,
        requiredRoles: ["USER", "MANAGER", "ADMIN"],
        items: [
            { title: "Introduction", url: "#", requiredRoles: ["USER", "MANAGER", "ADMIN"] },
            { title: "Get Started", url: "#", requiredRoles: ["USER", "MANAGER", "ADMIN"] },
            { title: "Tutorials", url: "#", requiredRoles: ["MANAGER", "ADMIN"] },
            { title: "Changelog", url: "#", requiredRoles: ["ADMIN"] },
        ],
    },
    {
        title: "Finanzas",
        url: "#",
        icon: ChartNoAxesCombined,
        requiredRoles: ["ADMIN"],
        items: [
            { title: "General", url: "#", requiredRoles: ["ADMIN"] },
            { title: "Team", url: "#", requiredRoles: ["ADMIN"] },
            { title: "Billing", url: "#", requiredRoles: ["ADMIN"] },
            { title: "Limits", url: "#", requiredRoles: ["ADMIN"] },
        ],
    },
]

export const DEFAULT_TEAMS: TeamItem[] = [
    { name: "Erick", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
]

export const DEFAULT_PROJECTS: ProjectItem[] = [
    { name: "Proyectos RRHH", url: "#", icon: FolderCog },
    { name: "Curricular", url: "#", icon: NotebookTabs },
    { name: "Académica", url: "#", icon: GraduationCap },
]