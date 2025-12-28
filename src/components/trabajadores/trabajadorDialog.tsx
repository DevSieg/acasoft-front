import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { TrabajadorForm } from "./TrabajadorForm";

export interface Trabajador {
    idPersona: number| null;
    nombre: string | null;
    apellido: string | null;
    dni: string | null;
    telefono: string | null;
    correo: string | null;
    idApoderado: number | null;
    tipoPersona: string;
}


export interface TrabajadorFormData {
    idPersona?: number;
    nombre: string | null;
    apellido: string | null;
    dni: string | null;
    telefono: string | null;
    correo: string | null;
    idApoderado?: number | null;
    tipoPersona: string;
    password?: string;
}
export interface TrabajadorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trabajador: Trabajador | null;
    onSubmit: (data: TrabajadorFormData) => void;
}
export function TrabajadorDialog({
    open,
    onOpenChange,
    trabajador,
    onSubmit,
}: TrabajadorDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {trabajador ? 'Editar Trabajador' : 'Registrar Trabajador'}
                    </DialogTitle>
                    <DialogDescription>
                        {trabajador
                            ? 'Actualiza los datos del trabajador'
                            : 'Completa los datos para registrar un nuevo trabajador'}
                    </DialogDescription>
                </DialogHeader>
                <TrabajadorForm
                    trabajador={trabajador}
                    onSubmit={onSubmit}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
