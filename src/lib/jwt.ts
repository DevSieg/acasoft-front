export type DecodedJWT = { exp?: number;[k: string]: unknown }

export function decodeJwt(token: string): DecodedJWT | null {
    try {
        const [, payload] = token.split(".")
        const json = Buffer.from(payload, "base64").toString("utf8")
        return JSON.parse(json)
    } catch {
        return null
    }
}

export function getExpFromJwt(token: string): number | null {
    const d = decodeJwt(token)
    return d?.exp ?? null
}
