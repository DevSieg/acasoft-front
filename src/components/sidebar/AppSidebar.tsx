"use client"

import * as React from "react"
import {
    AudioWaveform,
    ChartNoAxesCombined,
    Command,
    FolderCog,
    GalleryVerticalEnd,
    GraduationCap,
    NotebookTabs,
    Sparkles,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/NavMain"
import { NavUser } from "@/components/sidebar/NavUser"
import { TeamSwitcher } from "@/components/sidebar/TeamSwitcger"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/auth/AuthContext"
import { SidebarSkeleton } from "../skeleton/sidebar"

export const iconMap: Record<string, React.ElementType> = {
    AudioWaveform,
    ChartNoAxesCombined,
    Command,
    FolderCog,
    GalleryVerticalEnd,
    GraduationCap,
    NotebookTabs,
    Sparkles,
}
const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "#",
}
const menuItems = [
    {
        label: "perfil",
        icon: Sparkles,
        onClick: () => console.log("perfil"),
    },
    {
        label: "configuracion",
        icon: Sparkles,
        onClick: () => console.log("configuracion"),
    },

]
const navMain = [
    {
        title: "Gestion general",
        url: "#",
        icon: FolderCog,
        isActive: true,
        items: [
            {
                title: "Trabajadores*",
                url: "#",
            },
            {
                title: "Usuarios*",
                url: "#",
            },
            {
                title: "Roles*",
                url: "#",
            },
            {
                title: "Sedes*",
                url: "#",
            },
        ],
    },
    {
        title: "Gestion curricular",
        url: "#",
        icon: NotebookTabs,
        items: [
            {
                title: "Docentes",
                url: "#",
            },
            {
                title: "Areas",
                url: "#",
            },
            {
                title: "Carreras",
                url: "#",
            },
        ],
    },
    {
        title: "Gestion Academica",
        url: "#",
        icon: GraduationCap,
        items: [
            {
                title: "Introduction",
                url: "#",
            },
            {
                title: "Get Started",
                url: "#",
            },
            {
                title: "Tutorials",
                url: "#",
            },
            {
                title: "Changelog",
                url: "#",
            },
        ],
    },
    {
        title: "Finanzas",
        url: "#",
        icon: ChartNoAxesCombined,
        items: [
            {
                title: "General",
                url: "#",
            },
            {
                title: "Team",
                url: "#",
            },
            {
                title: "Billing",
                url: "#",
            },
            {
                title: "Limits",
                url: "#",
            },
        ],
    },
];

const teams = [
    {
        name: "Erick",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
    },
    {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
    },
    {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
    },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logout, loading } = useAuth()

    if (loading) {
        return <SidebarSkeleton {...props} />;
    }
    if(!user){
        return <SidebarSkeleton {...props} />;
    }
    const sidebarData = user?.sidebar ?? { navMain: [], teams: [], projects: [] }


    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={sidebarData.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain title="Inicio" items={sidebarData.navMain} />
                {/*<NavProjects title="Proyectos" projects={data.projects} />*/}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarData.user} menuItems={menuItems} logout={logout}/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
