import { type LucideIcon } from "lucide-react"

export type Role = "ADMIN" | "MANAGER" | "USER"

export type NavLeaf = {
    title: string
    url: string
    requiredRoles?: Role[]
}

export type NavItem = {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    requiredRoles?: Role[]
    items?: NavLeaf[]
}

export type TeamItem = {
    name: string
    logo: LucideIcon
    plan: string
}

export type ProjectItem = {
    name: string
    url: string
    icon: LucideIcon
}

export type SidebarData = {
    user: { name: string; email: string; avatar: string }
    teams: TeamItem[]
    navMain: NavItem[]
    projects: ProjectItem[]
}
