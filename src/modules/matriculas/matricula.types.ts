import { Alumno, Deuda } from "./matricula.data";

export interface Matricula {
    id: string;
    alumno: string;
    dni: string;
    periodo: string;
    area: string;
    categoria: string;
    estado: string;
}

export interface MatriculaFilters {
    search: string;
    periodo: string;
    area: string;
    categoria: string;
}

export interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

export interface SortingState {
    field: keyof Matricula;
    direction: 'asc' | 'desc';
}

// ============= COMPONENTE: SearchBar =============
export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export interface FiltersBarProps {
    periodo: string;
    area: string;
    categoria: string;
    onPeriodoChange: (value: string) => void;
    onAreaChange: (value: string) => void;
    onCategoriaChange: (value: string) => void;
    onSearch: () => void;
}

export interface MatriculaTableProps {
    data: Matricula[];
    onSort: (field: keyof Matricula) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onView: (id: string) => void;
}

export interface PaginationProps {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}


//===== DTOS =====
export interface MatriculaRegisterDto {
    alumno: Alumno;

    idEmpleado: number;
    idPeriodo: number;
    idCategoria: number;
    idCarrera: number;
    idSede: number;

    monto: number;
    idFormaPago: number;

    deuda: Deuda[];
}