import { Action, Column, GenericTable } from "@/components/tablas/TablaGeneric";
import { Badge, DollarSign, Edit, Eye, Trash2 } from "lucide-react";
import { DeudaDataDto } from "../deuda.types";

interface DeudasTableProps {
    data: DeudaDataDto[];
    onSort: (key: keyof DeudaDataDto) => void;
    onEdit: (id: number) => void;
    onView: (id: number) => void;
}
export function DeudaTable({
    data,
    onSort,
    onEdit,
    onView,
}: DeudasTableProps) {

    const columns: Column<DeudaDataDto>[] = [
        {
            key: "id",
            label: "ID-Matrícula",
            sortable: true,
            className: "font-medium",
        },
        {
            key: "alumno",
            label: "alumno",
            sortable: true,
        },
        {
            key: "dni",
            label: "DNI",
            sortable: true,
        },
        {
            key: "periodo",
            label: "periodo",
            sortable: true,
        }
        ,
        {
            key: "monto",
            label: "monto",
            sortable: true,
        },
        {
            key: "area",
            label: "area",
            sortable: true,
        },
        {
            key: "categoria",
            label: "categoria",
            sortable: true,
        },
        {
            key: "sede",
            label: "sede",
            sortable: true,
        }
        
    ];

    const actions: Action<DeudaDataDto>[] = [
        {
            label: "Ver detalles",
            icon: <Eye className="mr-2 h-4 w-4" />,
            onClick: (row) => onView(row.id),
        },
        {
            label: "Pagar total deuda",
            icon: <DollarSign className="mr-2 h-4 w-4" />,
            onClick: (row) => onEdit(row.id),
        }
    ];


    return (
        <GenericTable
            data={data}
            columns={columns}
            actions={actions}
            onSort={onSort}
            rowKey="id"
            emptyMessage="No se encontraron matrículas"
            className="mt-4"
        />
    );
}