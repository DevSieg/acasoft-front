'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UsuarioForm } from "@/components/usuarios/usuarioForm";
import { Shield, UserCog } from "lucide-react";

export interface Usuario {
    idUsuario: number | null;
    usuario: string | null;
    correo: string | null;
    estado: boolean;
    usuarios_roles?: UsuarioRol[];
}
export interface Rol {
    idRol: number;
    descripcion: string;
    estado: number;
}

export interface UsuarioRol {
    idRol: number;
    idUsuario: number;
    roles: Rol;
}


export interface UsuarioFormData {
    idUsuario?: number;
    usuario: string | null;
    correo: string | null;
    password?: string;
    estado?: boolean;
}

export interface UsuarioDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    usuario: Usuario | null;
    onSubmit: (data: UsuarioFormData) => void;
    onAssignRole?: (usuarioId: number | null) => void;
}

export default function UsuarioDialog({
    open,
    onOpenChange,
    usuario,
    onSubmit,
    onAssignRole,
}: UsuarioDialogProps) {
    return (

        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {usuario ? 'Editar Usuario' : 'Registrar Usuario'}
                    </DialogTitle>
                    <DialogDescription>
                        {usuario
                            ? 'Modifica los datos del usuario del sistema'
                            : 'Completa los datos para crear un nuevo usuario'}
                    </DialogDescription>
                </DialogHeader>

                <UsuarioForm
                    usuario={usuario}
                    onSubmit={onSubmit}
                    onCancel={() => onOpenChange(false)}
                />

                {/* Footer con botón para roles */}
                {usuario && (
                    <DialogFooter className="flex justify-between mt-4">
                        <Button
                            variant="outline"
                            onClick={() => onAssignRole?.(usuario.idUsuario ?? null)}
                        >
                            <UserCog className="w-4 h-4 mr-2" />
                            Asignar Rol
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
