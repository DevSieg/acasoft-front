'use client'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";

// ============= TIPOS GENÉRICOS =============
export type FilterType = 'select' | 'input' | 'date' | 'number';

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterConfig {
    key: string;
    label: string;
    type: FilterType;
    placeholder?: string;
    options?: FilterOption[]; // Solo para type: 'select'
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export interface GenericFiltersBarProps {
    filters: FilterConfig[];
    onSearch?: () => void;
    searchButtonLabel?: string;
    showSearchButton?: boolean;
}

// ============= COMPONENTE GENÉRICO =============
export function GenericFiltersBar({
    filters,
    onSearch,
    searchButtonLabel = "Buscar",
    showSearchButton = true,
}: GenericFiltersBarProps) {

    const renderFilter = (filter: FilterConfig) => {
        switch (filter.type) {
            case 'select':
                return (
                    <Select value={filter.value} onValueChange={filter.onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={filter.placeholder || `Seleccionar ${filter.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {filter.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case 'input':
                return (
                    <Input
                        type="text"
                        value={filter.value}
                        onChange={(e) => filter.onChange(e.target.value)}
                        placeholder={filter.placeholder || filter.label}
                    />
                );

            case 'date':
                return (
                    <Input
                        type="date"
                        value={filter.value}
                        onChange={(e) => filter.onChange(e.target.value)}
                    />
                );

            case 'number':
                return (
                    <Input
                        type="number"
                        value={filter.value}
                        onChange={(e) => filter.onChange(e.target.value)}
                        placeholder={filter.placeholder || filter.label}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-wrap gap-4 items-end">
            {filters.map((filter) => (
                <div
                    key={filter.key}
                    className={filter.className || "flex-1 min-w-[200px] space-y-1.5"}
                >
                    <Label>{filter.label}</Label>
                    {renderFilter(filter)}
                </div>
            ))}

            {showSearchButton && onSearch && (
                <Button onClick={onSearch} className="gap-2 min-w-[120px]">
                    <Filter className="h-4 w-4" />
                    {searchButtonLabel}
                </Button>
            )}
        </div>
    );
}