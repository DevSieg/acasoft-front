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
import { Pencil, PlusCircle, Shield } from "lucide-react";
import { useUsuarios } from "@/hooks/data/useUsuarios";
import UsuarioDialog, { Usuario, UsuarioFormData } from "@/components/usuarios/usuarioDialog";
import { useRoles } from "@/hooks/data/useRoles";
import AsignarRolDialog from "@/components/usuarios/asignarRolDialog";

// Aquí deberías reemplazar por tu servicio real de API

export default function UsuariosView() {
    const { usuarios, cargarUsuarios, editarUsuario, agregarUsuario } = useUsuarios();
    const { asignarRolUsuario } = useRoles();
    const [openDialog, setOpenDialog] = useState(false);
    const [openRolDialog, setOpenRolDialog] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

    // Cargar usuarios al montar
    useEffect(() => {
        cargarUsuarios();
    }, []);

    // Abrir modal para nuevo usuario
    const handleNuevo = () => {
        setUsuarioSeleccionado(null);
        setOpenDialog(true);
    };

    // Abrir modal para editar
    const handleEditar = (usuario: Usuario) => {
        setUsuarioSeleccionado(usuario);
        setOpenDialog(true);
    };

    // Enviar datos del formulario
    const handleSubmit = async (data: UsuarioFormData) => {
        try {
            if (usuarioSeleccionado) {
                await editarUsuario(usuarioSeleccionado.idUsuario!, data);
            } else {
                await agregarUsuario(data);
            }
            setOpenDialog(false);
            await cargarUsuarios();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    };

    // Asignar rol (ejemplo simple)
    const handleAsignarRol = (usuarioId: number | null) => {
        if (!usuarioId) return;
        setUsuarioSeleccionado({ idUsuario: usuarioId } as Usuario);
        setOpenRolDialog(true);
    };
    const handleConfirmarAsignacion = async (usuarioId: number, rolId: number) => {
        await asignarRolUsuario(usuarioId, rolId);
        await cargarUsuarios();
    };
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
                {/*<Button onClick={handleNuevo}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nuevo Usuario
                </Button>*/}
            </div>

            {/* Tabla de usuarios */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Usuario</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <TableRow key={usuario.idUsuario}>
                                    <TableCell>{usuario.idUsuario}</TableCell>
                                    <TableCell>{usuario.usuario}</TableCell>
                                    <TableCell>{usuario.correo}</TableCell>
                                    <TableCell>
                                        {usuario.usuarios_roles && usuario.usuarios_roles.length > 0
                                            ? usuario.usuarios_roles.map((ur) => ur.roles.descripcion).join(", ")
                                            : "Sin rol"}
                                    </TableCell>
                                    <TableCell>{usuario.estado ? "Activo" : "Inactivo"}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEditar(usuario)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => handleAsignarRol(usuario.idUsuario)}
                                        >
                                            <Shield className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-4">
                                    No hay usuarios registrados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Diálogo de registro/edición */}
            <UsuarioDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                usuario={usuarioSeleccionado}
                onSubmit={handleSubmit}
                onAssignRole={handleAsignarRol}
            />
            <AsignarRolDialog
                open={openRolDialog}
                onOpenChange={setOpenRolDialog}
                usuarioId={usuarioSeleccionado?.idUsuario || null}
                onAsignar={handleConfirmarAsignacion}
            />
        </div>
    );
}
