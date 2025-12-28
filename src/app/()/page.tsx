'use client'
import React, { JSX, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, GraduationCap, DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react'

// Tipos
type Estado = 'activa' | 'pendiente' | 'inactiva'

interface Matricula {
    id: number
    alumno: string
    curso: string
    fecha: string
    estado: Estado
    monto: number
}

interface PagoPendiente {
    id: number
    alumno: string
    concepto: string
    monto: number
    vencimiento: string
}

interface AlumnoDestacado {
    id: number
    nombre: string
    cursos: number
    asistencia: number
    promedio: number
}

export default function DashboardAcademia() {
    const [stats] = useState({
        totalAlumnos: 245,
        alumnosActivos: 198,
        totalMatriculas: 4,
        matriculasActivas: 4,
        ingresosMes: 0,
        pagosPendientes: 0,
    })

    const [matriculasRecientes] = useState<Matricula[]>([
        { id: 1, alumno: 'María González', curso: 'Matemáticas Avanzadas', fecha: '2024-12-20', estado: 'activa', monto: 450 },
        { id: 2, alumno: 'Juan Pérez', curso: 'Física Cuántica', fecha: '2024-12-22', estado: 'activa', monto: 520 },
        { id: 3, alumno: 'Ana Torres', curso: 'Química Orgánica', fecha: '2024-12-23', estado: 'pendiente', monto: 380 },
        { id: 4, alumno: 'Carlos Ruiz', curso: 'Biología Molecular', fecha: '2024-12-24', estado: 'activa', monto: 490 },
        { id: 5, alumno: 'Laura Sánchez', curso: 'Programación Web', fecha: '2024-12-25', estado: 'activa', monto: 600 }
    ])

    const [pagosPendientes] = useState<PagoPendiente[]>([
        { id: 1, alumno: 'Pedro Martínez', concepto: 'Matrícula Diciembre', monto: 450, vencimiento: '2024-12-28' },
        { id: 2, alumno: 'Sofia Ramírez', concepto: 'Mensualidad', monto: 380, vencimiento: '2024-12-29' },
        { id: 3, alumno: 'Diego López', concepto: 'Material de estudio', monto: 120, vencimiento: '2024-12-30' },
        { id: 4, alumno: 'Valentina Cruz', concepto: 'Matrícula Enero', monto: 520, vencimiento: '2025-01-02' }
    ])

    const [alumnosDestacados] = useState<AlumnoDestacado[]>([
        { id: 1, nombre: 'María González', cursos: 3, asistencia: 98, promedio: 9.5 },
        { id: 2, nombre: 'Carlos Ruiz', cursos: 2, asistencia: 95, promedio: 9.2 },
        { id: 3, nombre: 'Laura Sánchez', cursos: 4, asistencia: 97, promedio: 9.4 },
        { id: 4, nombre: 'Juan Pérez', cursos: 2, asistencia: 93, promedio: 8.9 }
    ])

    const getEstadoBadge = (estado: Estado): JSX.Element => {
        const badges: Record<Estado, JSX.Element> = {
            activa: <Badge className="bg-green-500">Activa</Badge>,
            pendiente: <Badge className="bg-yellow-500">Pendiente</Badge>,
            inactiva: <Badge className="bg-gray-500">Inactiva</Badge>,
        }
        return badges[estado]
    }

    const getInitials = (nombre: string): string => {
        return nombre
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
    }

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Dashboard Academia</h1>
                    <p className="text-slate-600 mt-1">Resumen general del sistema</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Exportar</Button>
                    <Button>Nueva Matrícula</Button>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Alumnos</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalAlumnos}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.alumnosActivos} activos actualmente
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Matrículas</CardTitle>
                        <GraduationCap className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalMatriculas}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.matriculasActivas} activas
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">S/ {stats.ingresosMes.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.pagosPendientes} pagos pendientes
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="matriculas" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="matriculas">Matrículas</TabsTrigger>
                    <TabsTrigger value="pagos">Pagos</TabsTrigger>
                    <TabsTrigger value="alumnos">Alumnos</TabsTrigger>
                </TabsList>

                {/* Matrículas */}
                <TabsContent value="matriculas" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Matrículas Recientes</CardTitle>
                            <CardDescription>Últimas matrículas registradas en el sistema</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/*matriculasRecientes.map((matricula) => (
                                    <div key={matricula.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                                    {getInitials(matricula.alumno)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{matricula.alumno}</p>
                                                <p className="text-sm text-slate-600">{matricula.curso}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-semibold">S/ {matricula.monto}</p>
                                                <p className="text-sm text-slate-600">{matricula.fecha}</p>
                                            </div>
                                            {getEstadoBadge(matricula.estado)}
                                        </div>
                                    </div>
                                ))*/}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Pagos */}
                <TabsContent value="pagos" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pagos Pendientes</CardTitle>
                            <CardDescription>Pagos que requieren seguimiento</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pagosPendientes.map((pago) => (
                                    <div key={pago.id} className="flex items-center justify-between p-4 rounded-lg border border-yellow-200 bg-yellow-50 hover:bg-yellow-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <AlertCircle className="h-8 w-8 text-yellow-600" />
                                            <div>
                                                <p className="font-medium">{pago.alumno}</p>
                                                <p className="text-sm text-slate-600">{pago.concepto}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-lg">S/ {pago.monto}</p>
                                            <p className="text-sm text-slate-600 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                Vence: {pago.vencimiento}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Alumnos */}
                <TabsContent value="alumnos" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alumnos Destacados</CardTitle>
                            <CardDescription>Estudiantes con mejor desempeño</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {alumnosDestacados.map((alumno, index) => (
                                    <div key={alumno.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
                                                {index + 1}
                                            </div>
                                            <Avatar>
                                                <AvatarFallback className="bg-purple-100 text-purple-700">
                                                    {getInitials(alumno.nombre)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{alumno.nombre}</p>
                                                <p className="text-sm text-slate-600">{alumno.cursos} cursos activos</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 text-center">
                                            <div>
                                                <p className="text-2xl font-bold text-green-600">{alumno.asistencia}%</p>
                                                <p className="text-xs text-slate-600">Asistencia</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-blue-600">{alumno.promedio}</p>
                                                <p className="text-xs text-slate-600">Promedio</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
