import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trabajador } from "./trabajadorDialog";
import { TrabajadorTableRow } from "./TrabajadorTableRow";

interface TrabajadoresTableProps {
    trabajadores: Trabajador[];
    onEdit: (t: Trabajador) => void;
    onDelete: (id: number) => void;
}

export function TrabajadoresTable({ trabajadores, onEdit, onDelete }: TrabajadoresTableProps) {
    if (trabajadores.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground border rounded-lg">
                <p className="text-lg">No hay trabajadores registrados</p>
                <p className="text-sm mt-2">
                    Comienza registrando un nuevo trabajador
                </p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>DNI</TableHead>
                        <TableHead>Correo</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trabajadores.map((t) => (
                        <TrabajadorTableRow
                            key={t.idPersona}
                            trabajador={t}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}