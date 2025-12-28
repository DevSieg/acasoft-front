'use client';
import React, { useEffect, useState } from "react";
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
import { Area, useAreas } from "@/hooks/data/useAreas";
import AreaDialog from "@/components/areas/areaDialog";

export default function AreasView() {
    const { areas, cargarAreas, agregarArea, editarArea } = useAreas();
    const [openDialog, setOpenDialog] = useState(false);
    const [areaSeleccionada, setAreaSeleccionada] = useState<Area | null>(null);

    useEffect(() => {
        cargarAreas();
    }, []);

    const handleNuevo = () => {
        setAreaSeleccionada(null);
        setOpenDialog(true);
    };

    const handleEditar = (area: Area) => {
        setAreaSeleccionada(area);
        setOpenDialog(true);
    };

    const handleSubmit = async (data: Omit<Area, "idArea">) => {
        try {
            if (areaSeleccionada?.idArea) {
                await editarArea(areaSeleccionada.idArea, data);
            } else {
                await agregarArea(data);
            }
            setOpenDialog(false);
            await cargarAreas();
        } catch (error) {
            console.error("Error guardando área:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gestión de Áreas</h2>
                <Button onClick={handleNuevo}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nueva Área
                </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Área</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {areas.length > 0 ? (
                            areas.map((area) => (
                                <TableRow key={area.idArea}>
                                    <TableCell>{area.idArea}</TableCell>
                                    <TableCell>{area.areaDetalle}</TableCell>
                                    <TableCell>{area.estado ? "Activo" : "Inactivo"}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => handleEditar(area)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">
                                    No hay áreas registradas
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AreaDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                areaActual={areaSeleccionada}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
