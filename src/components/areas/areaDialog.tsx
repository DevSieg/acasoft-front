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
import { Area } from "@/hooks/data/useAreas";

interface AreaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    areaActual?: Area | null;
    onSubmit: (data: Omit<Area, "idArea">) => Promise<void>;
}

export default function AreaDialog({
    open,
    onOpenChange,
    areaActual,
    onSubmit
}: AreaDialogProps) {
    const [form, setForm] = useState<Omit<Area, "idArea">>({
        estado: 1,
        areaDetalle: ""
    });

    useEffect(() => {
        if (areaActual) {
            setForm({
                estado: areaActual.estado,
                areaDetalle: areaActual.areaDetalle
            });
        } else {
            setForm({
                estado: 1,
                areaDetalle: ""
            });
        }
    }, [areaActual, open]);

    const handleChange = (field: keyof Omit<Area, "idArea">, value: string | number | null) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        await onSubmit(form);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{areaActual ? "Editar Área" : "Nueva Área"}</DialogTitle>
                    <DialogDescription>
                        Completa los datos del área.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <div>
                        <Label>Área</Label>
                        <Input
                            value={form.areaDetalle || ""}
                            onChange={(e) => handleChange("areaDetalle", e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit}>{areaActual ? "Actualizar" : "Crear"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
