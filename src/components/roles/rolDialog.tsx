'use client';
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { rol } from "@/hooks/data/useRoles";

interface RolDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    rolActual?: rol | null;
    onSubmit: (data: rol) => Promise<void>;
}

export default function RolDialog({
    open,
    onOpenChange,
    rolActual,
    onSubmit
}: RolDialogProps) {
    const [descripcion, setDescripcion] = useState<string>("");
    const [estado, setEstado] = useState<number>(1); // Por defecto activo

    useEffect(() => {
        if (open && rolActual) {
            setDescripcion(rolActual.descripcion || "");
            setEstado(rolActual.estado || 1);
        } else if (open) {
            setDescripcion("");
            setEstado(1);
        }
    }, [open, rolActual]);

    const handleSubmit = async () => {
        await onSubmit({ descripcion, estado });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{rolActual ? "Editar Rol" : "Nuevo Rol"}</DialogTitle>
                    <DialogDescription>
                        Completa los datos del rol.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <div className="grid gap-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Input
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="estado">Estado</Label>
                        <select
                            id="estado"
                            value={estado}
                            onChange={(e) => setEstado(Number(e.target.value))}
                            className="border rounded px-2 py-1"
                        >
                            <option value={1}>Activo</option>
                            <option value={0}>Inactivo</option>
                        </select>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit}>
                        {rolActual ? "Actualizar" : "Crear"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
