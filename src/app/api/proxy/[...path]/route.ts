import { NextResponse } from "next/server"
import { headers as nextHeaders } from "next/headers"
import { ensureAccessToken } from "@/lib/ensure-access-token"
import { getCsrfCookie } from "@/lib/cookies"
import { API_BASE } from "@/env"

export async function handler(req: Request, { params }: { params: { path: string[] } }) {
    const token = ensureAccessToken()
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const url = new URL(req.url)
    const target = `${API_BASE}/${(params.path || []).join("/")}${url.search}`

    // CSRF: exigir header que coincida con cookie para métodos no-GET
    if (req.method !== "GET") {
        const csrfHeader = (await nextHeaders()).get("x-csrf-token")
        const csrfCookie = getCsrfCookie()
        if (!csrfHeader || !csrfCookie || csrfHeader !== await csrfCookie) {
            return NextResponse.json({ message: "Bad CSRF" }, { status: 403 })
        }
    }

    // Encabezados a reenviar (evita enviar cookies del navegador)
    const hopByHop = new Set([
        "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
        "te", "trailer", "transfer-encoding", "upgrade", "cookie"
    ])
    const incoming = nextHeaders()
    const forwardHeaders: Record<string, string> = {}
    ;(await incoming).forEach((v, k) => {
        if (!hopByHop.has(k.toLowerCase())) forwardHeaders[k] = v
    })
    forwardHeaders["authorization"] = `Bearer ${token}`
    forwardHeaders["content-type"] = (await incoming).get("content-type") || "application/json"

    const init: RequestInit = {
        method: req.method,
        headers: forwardHeaders,
        body: req.method === "GET" ? undefined : await req.text(),
        cache: "no-store",
    }

    const res = await fetch(target, init)

    // Reenviamos status + body (sin exponer Set-Cookie de la API externa)
    const data = await res.text()
    return new NextResponse(data, {
        status: res.status,
        headers: {
            "content-type": res.headers.get("content-type") || "application/json",
        },
    })
}

// Next.js requiere exportar handlers por método:
export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE }
