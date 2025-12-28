"use client"
import { createContext, useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { login, refreshAccessToken } from "@/services/auth"
import { API_BASE } from "@/env"

type AuthContextType = {
    user: any | null
    accessToken: string | null
    loading: boolean
    loginUser: (usuario: string, password: string) => Promise<boolean>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const initAuth = async () => {
            try {
                // intenta refrescar token al montar la app
                const responseRefresh = await refreshAccessToken()
                const newToken = responseRefresh?.accessToken;

                if (newToken) {
                    setAccessToken(newToken)
                    localStorage.setItem("accessToken", newToken)
                    const user = responseRefresh.user;
                    const sidebar = responseRefresh.sidebar;

                    if (user && sidebar) {
                        const data = { ...user, sidebar }
                        setUser(data)
                    } else {
                        // Si /me falla, cerramos sesión
                        logout()
                    }
                } else {
                    // Solo logout si realmente NO hay token después del refresh
                    logout()
                }
            } catch (e) {
                console.error("Error inicializando auth:", e)
                // Opcional: logout() aquí si quieres cerrar sesión en caso de error
                logout()
            } finally {
                setLoading(false)
            }
        }

        initAuth()
    }, [])


    async function loginUser(usuario: string, password: string) {
        try {
            const { accessToken, user, sidebar } = await login(usuario, password)
            setAccessToken(accessToken)
            setUser({ ...user, sidebar })
            console.log("sidebar login", sidebar)
            console.log(accessToken, user)
            return true
        } catch (err) {
            console.error("Error login:", err)
            return false
        }
    }

    async function logout() {
        try {
            await fetch(`${API_BASE}/auth/logout`, {
                method: "POST",
                credentials: "include", // muy importante para que mande la cookie
            })
        } catch (e) {
            console.error("Error cerrando sesión en backend:", e)
        } finally {
            setAccessToken(null)
            setUser(null)
            localStorage.removeItem("__refresh") // si lo guardaste
            router.push("/login")
        }
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, loading, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
    return ctx
}
