'use client'
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, PlusCircle } from "lucide-react";
import { rol, useRoles } from "@/hooks/data/useRoles";
import RolDialog from "@/components/roles/rolDialog";

export default function RolesView() {
    const { roles, cargarRoles, agregarRol, editarRol } = useRoles();
    const [openDialog, setOpenDialog] = useState(false);
    const [rolSeleccionado, setRolSeleccionado] = useState<rol | null>(null);

    useEffect(() => {
        cargarRoles();
    }, []);

    const handleNuevo = () => {
        setRolSeleccionado(null);
        setOpenDialog(true);
    };

    const handleEditar = (rol: rol) => {
        setRolSeleccionado(rol);
        setOpenDialog(true);
    };
    const handleSubmit = async (data: rol) => {
        try {
            if (rolSeleccionado) {
                await editarRol(rolSeleccionado.idRol!, data);
            } else {
                await agregarRol(data);
            }
            setOpenDialog(false);
            await cargarRoles();
        } catch (error) {
            console.error("Error al guardar rol:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gestión de Roles</h2>
                <Button onClick={handleNuevo}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nuevo Rol
                </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.length > 0 ? (
                            roles.map((rol) => (
                                <TableRow key={rol.idRol}>
                                    <TableCell>{rol.idRol}</TableCell>
                                    <TableCell>{rol.descripcion}</TableCell>
                                    <TableCell>{rol.estado ? "Activo" : "Inactivo"}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEditar(rol)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">
                                    No hay roles registrados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <RolDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                rolActual={rolSeleccionado}
                onSubmit={handleSubmit}
            />

        </div>
    );
}
