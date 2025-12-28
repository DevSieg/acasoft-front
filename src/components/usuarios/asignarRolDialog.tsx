'use client'
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { rol, useRoles } from "@/hooks/data/useRoles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface AsignarRolDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    usuarioId: number | null;
    onAsignar: (usuarioId: number, rolId: number) => Promise<void>;
}

export default function AsignarRolDialog({
    open,
    onOpenChange,
    usuarioId,
    onAsignar,
}: AsignarRolDialogProps) {
    const { roles, cargarRoles } = useRoles();
    const [rolSeleccionado, setRolSeleccionado] = useState<string>("");

    useEffect(() => {
        if (open) {
            cargarRoles();
        }
    }, [open]);

    const handleAsignar = async () => {
        if (!usuarioId || !rolSeleccionado) return;
        await onAsignar(usuarioId, parseInt(rolSeleccionado));
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Asignar rol al usuario</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Selecciona un rol</Label>
                        <Select value={rolSeleccionado} onValueChange={setRolSeleccionado}>
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((rol:rol) => (
                                    <SelectItem key={rol.idRol} value={rol.idRol?.toString()|| ''}>
                                        {rol.descripcion}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleAsignar}>Asignar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
