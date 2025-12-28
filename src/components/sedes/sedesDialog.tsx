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
import { CreateSedeDto } from "@/hooks/data/useSedes";

interface SedeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sedeActual?: CreateSedeDto | null;
    onSubmit: (data: CreateSedeDto) => Promise<void>;
}

export default function SedeDialog({
    open,
    onOpenChange,
    sedeActual,
    onSubmit
}: SedeDialogProps) {
    const [form, setForm] = useState<CreateSedeDto>({
        estado: 1,
        descripcion: "",
        telefono: "",
        correo: "",
        direccion: ""
    });

    useEffect(() => {
        if (sedeActual) {
            setForm(sedeActual);
        } else {
            setForm({
                estado: 1,
                descripcion: "",
                telefono: "",
                correo: "",
                direccion: ""
            });
        }
    }, [sedeActual]);

    const handleChange = (field: keyof CreateSedeDto, value: string | number | null) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        await onSubmit(form);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{sedeActual ? "Editar Sede" : "Nueva Sede"}</DialogTitle>
                    <DialogDescription>
                        Completa los datos de la sede.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <div>
                        <Label>Descripción</Label>
                        <Input value={form.descripcion || ""} onChange={(e) => handleChange("descripcion", e.target.value)} />
                    </div>
                    <div>
                        <Label>Teléfono</Label>
                        <Input value={form.telefono || ""} onChange={(e) => handleChange("telefono", e.target.value)} />
                    </div>
                    <div>
                        <Label>Correo</Label>
                        <Input value={form.correo || ""} onChange={(e) => handleChange("correo", e.target.value)} />
                    </div>
                    <div>
                        <Label>Dirección</Label>
                        <Input value={form.direccion || ""} onChange={(e) => handleChange("direccion", e.target.value)} />
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit}>{sedeActual ? "Actualizar" : "Crear"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
