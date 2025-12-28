'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { Matricula, MatriculaTableProps } from "../matricula.types";

export function MatriculaTable({
    data,
    onSort,
    onEdit,
    onDelete,
    onView,
}: MatriculaTableProps) {

    const getEstadoBadge = (estado: Matricula["estado"]) => {
        const variants: Record<Matricula["estado"], "default" | "secondary" | "destructive"> = {
            activo: "default",
            pendiente: "secondary",
            inactivo: "destructive",
        };

        return (
            <Badge variant={variants[estado]} className="capitalize">
                {estado}
            </Badge>
        );
    };

    return (
        <div className="rounded-lg border bg-card">
            <Table>
                {/* HEADER */}
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Button variant="ghost" onClick={() => onSort("dni")} className="gap-2 px-0">
                                DNI <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>

                        <TableHead>
                            <Button variant="ghost" onClick={() => onSort("alumno")} className="gap-2 px-0">
                                Alumno <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>

                        <TableHead>
                            <Button variant="ghost" onClick={() => onSort("periodo")} className="gap-2 px-0">
                                Período <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>

                        <TableHead>
                            <Button variant="ghost" onClick={() => onSort("area")} className="gap-2 px-0">
                                Área <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>

                        <TableHead>
                            <Button variant="ghost" onClick={() => onSort("categoria")} className="gap-2 px-0">
                                Categoría <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>

                        <TableHead>
                            <Button variant="ghost" onClick={() => onSort("estado")} className="gap-2 px-0">
                                Estado <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead>

                        {/*<TableHead>
                            <Button
                                variant="ghost"
                                onClick={() => onSort("fechaMatricula")}
                                className="gap-2 px-0"
                            >
                                Fecha <ArrowUpDown className="h-4 w-4" />
                            </Button>
                        </TableHead> */}

                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                No se encontraron matrículas
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((matricula) => (
                            <TableRow key={matricula.id}>
                                <TableCell className="font-medium">{matricula.dni}</TableCell>
                                <TableCell>{matricula.alumno}</TableCell>
                                <TableCell>{matricula.periodo}</TableCell>
                                <TableCell>{matricula.area}</TableCell>
                                <TableCell>{matricula.categoria}</TableCell>
                                <TableCell>{getEstadoBadge(matricula.estado)}</TableCell>
                                {/*<TableCell>
                                    {new Date(matricula.fechaMatricula).toLocaleDateString("es-ES")}
                                </TableCell>*/}

                                {/* ACCIONES */}
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" className="w-44">
                                            <DropdownMenuItem onClick={() => onView(matricula.id)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                Ver detalles
                                            </DropdownMenuItem>

                                            <DropdownMenuItem onClick={() => onEdit(matricula.id)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Editar
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() => onDelete(matricula.id)}
                                                className="text-red-600 focus:text-red-600"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
