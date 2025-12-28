import { getAccessCookie, clearAccessCookie } from "@/lib/cookies"
import { getExpFromJwt } from "@/lib/jwt"

export async function ensureAccessToken(): Promise<string | null> {
    const token = await getAccessCookie()
    if (!token) return null;

    // Si el JWT tiene exp, verificar expiración para evitar llamadas inválidas.
    const exp = getExpFromJwt(token)
    if (exp && exp * 1000 <= Date.now()) {
        clearAccessCookie()
        return null
    }
    return token
}
