import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { FiltersBarProps } from "../matricula.types";

export function FiltersBar({
    periodo,
    area,
    categoria,
    onPeriodoChange,
    onAreaChange,
    onCategoriaChange,
    onSearch,
}: FiltersBarProps) {
    const PERIODOS = ["2024-I", "2024-II", "2023-I", "2023-II"];
    const AREAS = ["Matemáticas", "Ciencias", "Humanidades", "Tecnología"];
    const CATEGORIAS = ["Regular", "Becado", "Especial"];

    return (
        <div className="flex flex-wrap gap-4 items-end">
            {/* Período */}
            <div className="flex-1 min-w-[200px] space-y-1.5">
                <Label>Período</Label>
                <Select value={periodo} onValueChange={onPeriodoChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Todos los períodos" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los períodos</SelectItem>
                        {PERIODOS.map((p) => (
                            <SelectItem key={p} value={p}>
                                {p}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Área */}
            <div className="flex-1 min-w-[200px] space-y-1.5">
                <Label>Área</Label>
                <Select value={area} onValueChange={onAreaChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Todas las áreas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las áreas</SelectItem>
                        {AREAS.map((a) => (
                            <SelectItem key={a} value={a}>
                                {a}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Categoría */}
            <div className="flex-1 min-w-[200px] space-y-1.5">
                <Label>Categoría</Label>
                <Select value={categoria} onValueChange={onCategoriaChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        {CATEGORIAS.map((c) => (
                            <SelectItem key={c} value={c}>
                                {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Botón Buscar */}
            <Button
                onClick={onSearch}
                className="gap-2 min-w-[120px]"
            >
                <Filter className="h-4 w-4" />
                Buscar
            </Button>
        </div>
    );
}
