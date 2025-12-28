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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAreas } from "@/hooks/data/useAreas";
import { CreateCarreraDto } from "@/hooks/data/useCarreras";

interface CarreraDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    carreraActual?: CreateCarreraDto | null;
    onSubmit: (data: CreateCarreraDto) => Promise<void>;
}

export default function CarreraDialog({
    open,
    onOpenChange,
    carreraActual,
    onSubmit
}: CarreraDialogProps) {
    const { areas, cargarAreas } = useAreas();

    const [form, setForm] = useState<CreateCarreraDto>({
        nombreCarrera: "",
        estado: 1,
        idArea: null
    });

    useEffect(() => {
        cargarAreas();
        if (carreraActual) {
            setForm(carreraActual);
        } else {
            setForm({
                nombreCarrera: "",
                estado: 1,
                idArea: null
            });
        }
    }, [carreraActual, open]);

    const handleChange = (field: keyof CreateCarreraDto, value: any) => {
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
                    <DialogTitle>{carreraActual ? "Editar Carrera" : "Nueva Carrera"}</DialogTitle>
                    <DialogDescription>
                        Completa los datos de la carrera.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <div>
                        <Label>Nombre Carrera</Label>
                        <Input
                            value={form.nombreCarrera || ""}
                            onChange={(e) => handleChange("nombreCarrera", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Área</Label>
                        <Select
                            onValueChange={(value) => handleChange("idArea", Number(value))}
                            value={form.idArea?.toString() || ""}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un área" />
                            </SelectTrigger>
                            <SelectContent>
                                {areas.map(area => (
                                    <SelectItem key={area.idArea} value={area.idArea.toString()}>
                                        {area.areaDetalle}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit}>{carreraActual ? "Actualizar" : "Crear"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
