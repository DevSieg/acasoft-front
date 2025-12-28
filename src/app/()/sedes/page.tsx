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
import { CreateSedeDto, useSedes } from "@/hooks/data/useSedes";
import SedeDialog from "@/components/sedes/sedesDialog";

export default function SedesView() {
    const { sedes, cargarSedes, agregarSede, editarSede } = useSedes();
    const [openDialog, setOpenDialog] = useState(false);
    const [sedeSeleccionada, setSedeSeleccionada] = useState<CreateSedeDto | null>(null);

    useEffect(() => {
        cargarSedes();
    }, []);

    const handleNuevo = () => {
        setSedeSeleccionada(null);
        setOpenDialog(true);
    };

    const handleEditar = (sede: CreateSedeDto) => {
        setSedeSeleccionada(sede);
        setOpenDialog(true);
    };

    const handleSubmit = async (data: CreateSedeDto) => {
        try {
            if (sedeSeleccionada?.idSede) {
                await editarSede(sedeSeleccionada.idSede, data);
            } else {
                await agregarSede(data);
            }
            setOpenDialog(false);
            await cargarSedes();
        } catch (error) {
            console.error("Error al guardar sede:", error);
        }
    };


    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gestión de Sedes</h2>
                <Button onClick={handleNuevo}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nueva Sede
                </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Dirección</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sedes.length > 0 ? (
                            sedes.map((sede, i) => (
                                <TableRow key={i}>
                                    <TableCell>{sede.descripcion}</TableCell>
                                    <TableCell>{sede.telefono}</TableCell>
                                    <TableCell>{sede.correo}</TableCell>
                                    <TableCell>{sede.direccion}</TableCell>
                                    <TableCell>{sede.estado ? "Activo" : "Inactivo"}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => handleEditar(sede)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-4">
                                    No hay sedes registradas
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <SedeDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                sedeActual={sedeSeleccionada}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
