function readCookie(name: string) {
    if (typeof document === "undefined") return null
    const m = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]+)"))
    return m ? decodeURIComponent(m[2]) : null
}

export async function clientProxyFetch(path: string, init?: RequestInit) {
    const isGet = !init?.method || init?.method.toUpperCase() === "GET"
    const headers = new Headers(init?.headers || {})
    headers.set("content-type", headers.get("content-type") || "application/json")
    if (!isGet) {
        const csrf = readCookie("__csrf")
        if (csrf) headers.set("x-csrf-token", csrf)
    }
    const res = await fetch(`/api/proxy${path.startsWith("/") ? "" : "/"}${path}`, {
        ...init,
        headers,
    })
    return res
}
