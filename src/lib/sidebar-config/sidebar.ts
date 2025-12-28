import { filterNavForRoles } from "@/lib/sidebar-config/permissions"
import { BASE_NAV, DEFAULT_PROJECTS, DEFAULT_TEAMS } from "@/lib/sidebar-config/menuconfig"
import { Role, SidebarData } from "@/types/sidebar"
import { cookies } from "next/headers"
import { API_BASE } from "@/env"

export async function getSidebarData(): Promise<SidebarData> {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value // si lo guardas en cookie

    if (!accessToken) {
        return {
            user: { name: "Guest", email: "guest@example.com", avatar: '' },
            teams: [],
            projects: [],
            navMain: [],
        }
    }

    // Pedir /auth/me a tu backend NestJS
    const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
        cache: "no-store", // no queremos que lo cachee
    })

    if (!res.ok) {
        return {
            user: { name: "Guest", email: "guest@example.com", avatar: '' },
            teams: [],
            projects: [],
            navMain: [],
        }
    }

    const data = await res.json()
    const roles: Role[] = data.user?.usuarios_roles?.map((r: any) => r.roles.nombre) ?? []

    const navMain = filterNavForRoles(BASE_NAV, roles)

    return {
        user: {
            name: data.user?.personas?.nombre ?? "Sin nombre",
            email: data.user?.usuario ?? "no-email@example.com",
            avatar: data.user?.fotoURL ?? null,
        },
        teams: DEFAULT_TEAMS,
        projects: DEFAULT_PROJECTS,
        navMain,
    }

}

