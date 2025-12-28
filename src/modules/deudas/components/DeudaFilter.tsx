import { FilterConfig, GenericFiltersBar } from "@/components/tablas/FilterGeneric";
import { MatriculaFilters } from "@/modules/matriculas/matricula.types";
import { useEffect, useState } from "react";
import { DeudaParams } from "../deuda.types";
import { useSedes } from "@/hooks/data/useSedes";

interface DeudaFiltersBarProps {
    idSede: string;
    search: string;
    onSedeChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    onSearch: () => void;
}

export function DeudaFiltersBar({
    idSede,
    search,
    onSedeChange,
    onSearchChange,
    onSearch
}: DeudaFiltersBarProps) {
    const { sedes, cargarSedes } = useSedes();

    // ✅ Cargar sedes al montar el componente
    useEffect(() => {
        cargarSedes();
    }, []);

    const filters: FilterConfig[] = [
        {
            key: "search",
            label: "Buscar",
            type: "input",
            placeholder: "Buscar por DNI",
            value: search,
            className: 'w-full space-y-1.5',
            onChange: onSearchChange, // ✅ Cambio: usar onSearchChange
        },
        {
            key: "idSede",
            label: "Sede",
            type: "select",
            placeholder: "Todas las sedes",
            value: idSede,
            onChange: onSedeChange, // ✅ Cambio: usar onSedeChange (del padre)
            options: [
                { label: "Todas las sedes", value: "all" },
                // ✅ Usar las sedes cargadas desde el hook
                ...sedes.map((sede) => ({
                    label: sede.descripcion??"",
                    value: String(sede.idSede)
                })),
            ],
        },
    ];

    return (
        <GenericFiltersBar
            filters={filters}
            onSearch={onSearch} // ✅ Botón de búsqueda manual
            searchButtonLabel="Buscar"
        />
    );
}