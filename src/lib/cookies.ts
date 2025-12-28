import { ACCESS_COOKIE, COOKIE_DOMAIN } from "@/env"
import { cookies } from "next/headers"

export async function setAccessCookie(token: string, maxAgeSec: number) {
    const c = await cookies()
    c.set(ACCESS_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: maxAgeSec,
        ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
    })
}

export async function clearAccessCookie() {
    (await cookies()).set(ACCESS_COOKIE, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
        ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
    })
}

export async function getAccessCookie(): Promise<string | null> {
    const c = await cookies()
    return c.get(ACCESS_COOKIE)?.value ?? null
}

// CSRF (cookie NO httpOnly) para métodos no-GET en el proxy
const CSRF_COOKIE = "__csrf"

export async function setCsrfCookie(value: string) {
    const c = await cookies()
    c.set(CSRF_COOKIE, value, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
    })
}

export async function getCsrfCookie(): Promise<string | null> {
    return (await cookies()).get(CSRF_COOKIE)?.value ?? null
}

export async function clearCsrfCookie() {
    (await cookies()).set(CSRF_COOKIE, "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
        ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
    })
}
