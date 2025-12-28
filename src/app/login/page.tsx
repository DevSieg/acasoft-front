'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import FondoAnimado from '@/components/login/FondoAnimado'
import { useAuth } from '@/auth/AuthContext'

export default function LoginPage() {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const { loginUser } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const success = await loginUser(usuario, password)
        if (success) {
            router.push("/")
        } else {
            setError("Credenciales inválidas")
        }
    }

    return (
        <div className="min-h-screen flex">
            <motion.div className="hidden md:flex w-1/2 bg-blue-700 items-center justify-center">
                <FondoAnimado />
                <motion.h1 className="text-white text-4xl font-bold z-10 px-8">
                    Bienvenido al sistema
                </motion.h1>
            </motion.div>

            <div className="relative w-full md:w-1/2 flex items-center justify-center bg-gray-100">
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
                >
                    <h2 className="text-gray-900 text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="text-gray-600 w-full px-4 py-2 border rounded mb-4"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="text-gray-600 w-full px-4 py-2 border rounded mb-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <motion.button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Ingresar
                    </motion.button>
                </motion.form>
            </div>
        </div>
    )
}
