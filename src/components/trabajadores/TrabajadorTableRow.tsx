import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Trabajador } from "./trabajadorDialog";

interface TrabajadorTableRowProps {
    trabajador: Trabajador;
    onEdit: (t: Trabajador) => void;
    onDelete: (id: number) => void;
}

export function TrabajadorTableRow({ trabajador, onEdit, onDelete }: TrabajadorTableRowProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">{trabajador.idPersona}</TableCell>
            <TableCell>{trabajador.nombre}</TableCell>
            <TableCell>{trabajador.apellido}</TableCell>
            <TableCell>{trabajador.dni}</TableCell>
            <TableCell>{trabajador.correo}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(trabajador)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(trabajador.idPersona)}
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}