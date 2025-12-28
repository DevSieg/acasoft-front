import { API_BASE } from "@/env"

export async function apiFetch(input: string, init?: RequestInit) {
    const res = await fetch(`${API_BASE}${input}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
        // Importante para que los Route Handlers puedan usar cookies del request actual en SSR
        cache: "no-store",
    })
    return res
}
