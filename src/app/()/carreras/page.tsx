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
import { CreateCarreraBody, CreateCarreraDto, useCarreras } from "@/hooks/data/useCarreras";
import CarreraDialog from "@/components/carreras/carreraDialog";

export default function CarrerasView() {
    const { carreras, cargarCarreras, agregarCarrera, editarCarrera } = useCarreras();
    const [openDialog, setOpenDialog] = useState(false);
    const [carreraSeleccionada, setCarreraSeleccionada] = useState<CreateCarreraDto | null>(null);

    useEffect(() => {
        cargarCarreras();
    }, []);

    const handleNuevo = () => {
        setCarreraSeleccionada(null);
        setOpenDialog(true);
    };

    const handleEditar = (carrera: CreateCarreraDto) => {
        console.log(carreras)
        setCarreraSeleccionada(carrera);
        setOpenDialog(true);
    };

    const handleSubmit = async (data: CreateCarreraDto) => {
        try {
            if (carreraSeleccionada?.idCarrera) {
                await editarCarrera(carreraSeleccionada.idCarrera, data);
            } else {
                await agregarCarrera(data);
            }
            setOpenDialog(false);
            await cargarCarreras();
        } catch (error) {
            console.error("Error guardando carrera:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gestión de Carreras</h2>
                <Button onClick={handleNuevo}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nueva Carrera
                </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre Carrera</TableHead>
                            <TableHead>Área</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {carreras.length > 0 ? (
                            carreras.map((carrera) => (
                                <TableRow key={carrera.idCarrera}>
                                    <TableCell>{carrera.idCarrera}</TableCell>
                                    <TableCell>{carrera.nombreCarrera}</TableCell>
                                    <TableCell>
                                        {carrera.area?.areaDetalle || "Sin área"}
                                    </TableCell>
                                    <TableCell>{carrera.estado ? "Activo" : "Inactivo"}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => handleEditar(carrera)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">
                                    No hay carreras registradas
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CarreraDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                carreraActual={carreraSeleccionada}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
