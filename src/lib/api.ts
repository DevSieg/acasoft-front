// lib/api.ts
export async function apiFetch(url: string, options: RequestInit = {}, accessToken?: string) {
    const headers: any = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers,
        credentials: "include", // importante para enviar la cookie refresh
    });

    if (res.status === 401) {
        // Intentar refrescar token
        const newToken = await refreshAccessToken();
        if (newToken) {
            return apiFetch(url, options, newToken); // reintenta con el nuevo token
        }
    }

    return res;
}

export async function refreshAccessToken(): Promise<string | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.accessToken; // backend debe devolver el nuevo accessToken
}
