
// GenericTable.tsx
'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// ============= TIPOS GENÉRICOS =============
export interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
    className?: string;
}

export interface Action<T> {
    label: string;
    icon: React.ReactNode;
    onClick: (row: T) => void;
    className?: string;
}

export interface GenericTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: Action<T>[];
    onSort?: (key: keyof T) => void;
    emptyMessage?: string;
    rowKey: keyof T;
    className?: string;
}

// ============= COMPONENTE GENÉRICO =============
export function GenericTable<T extends Record<string, any>>({
    data,
    columns,
    actions,
    onSort,
    emptyMessage = "No se encontraron registros",
    rowKey,
    className
}: GenericTableProps<T>) {
    return (
        <div className={"rounded-lg border bg-card " + className ? ` ${className}` : ""}>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={String(column.key)} className={column.className}>
                                {column.sortable && onSort ? (
                                    <Button
                                        variant="ghost"
                                        onClick={() => onSort(column.key)}
                                        className="gap-2 px-0"
                                    >
                                        {column.label} <ArrowUpDown className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    column.label
                                )}
                            </TableHead>
                        ))}
                        {actions && actions.length > 0 && (
                            <TableHead className="text-right">Acciones</TableHead>
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="text-center py-8 text-muted-foreground"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow key={String(row[rowKey])}>
                                {columns.map((column) => (
                                    <TableCell key={String(column.key)} className={column.className}>
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : row[column.key]}
                                    </TableCell>
                                ))}

                                {actions && actions.length > 0 && (
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end" className="w-44">
                                                {actions.map((action, index) => (
                                                    <DropdownMenuItem
                                                        key={index}
                                                        onClick={() => action.onClick(row)}
                                                        className={action.className}
                                                    >
                                                        {action.icon}
                                                        {action.label}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}