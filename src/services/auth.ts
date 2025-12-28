import { API_BASE } from "@/env"

// services/auth.ts
export async function login(usuario: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
        credentials: "include", // muy importante para el refresh cookie
    })
    if (!res.ok) throw new Error("Credenciales inválidas")
    return res.json() // { accessToken, user }
}

export async function refreshAccessToken() {
    try {
        const res = await fetch(`${API_BASE}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        })
        if (!res.ok) return null
        const data = await res.json()
        return data;
    } catch {
        return null
    }
}
