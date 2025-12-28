'use client'
import { SearchBar } from "@/components/trabajadores/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MatriculaModal from "@/modules/matriculas/components/CreateModal";
import { FiltersBar } from "@/modules/matriculas/components/FiltersBar";
import { MatriculaTable } from "@/modules/matriculas/components/MatriculaTable";
import { Pagination } from "@/modules/matriculas/components/Pagination";
import { useMatriculas } from "@/modules/matriculas/matricula.data";
import { Matricula, MatriculaFilters, PaginationState, SortingState } from "@/modules/matriculas/matricula.types";
import { Pencil, Plus, PlusCircle, Search, Table, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function MatriculasPage() {
    const [filters, setFilters] = useState<MatriculaFilters>({
        search: '',
        periodo: 'all',
        area: 'all',
        categoria: 'all',
    });

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sorting, setSorting] = useState<SortingState | undefined>(undefined);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { matriculas, matriculaRegister, paginate, cargarMatriculas, registrarMatricula, editarMatricula, cargarDataRegister } = useMatriculas();

    // Datos de ejemplo (reemplazar con tu API)
    useEffect(() => {
        cargarMatriculas();
        //setData(matriculas);
        setTotalItems(paginate?.total);
        cargarDataRegister();

    }, []);

    const handleSearch = () => {
        console.log('Buscando con filtros:', filters);
        // Aquí harías la llamada a tu API
    };

    const handleSort = (field: keyof Matricula) => {
        setSorting((prev: any) => {
            if (prev?.field === field) {
                return {
                    field,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc',
                };
            }
            return { field, direction: 'asc' };
        });
    };

    const handlePageChange = (page: number) => {
        setPagination((prev: any) => ({ ...prev, pageIndex: page - 1 }));
    };

    const handlePageSizeChange = (pageSize: number) => {
        setPagination({ pageIndex: 0, pageSize });
    };

    const handleEdit = (id: string) => {
        console.log('Editar matrícula:', id);
        alert(`Editar matrícula: ${id}`);
    };

    const handleView = (id: string) => {
        console.log('Ver matrícula:', id);
        alert(`Ver detalles de matrícula: ${id}`);
    };

    const handleDelete = (id: string) => {
        if (confirm('¿Está seguro de eliminar esta matrícula?')) {
            console.log('Eliminar matrícula:', id);
            alert(`Matrícula ${id} eliminada`);
        }
    };

    const handleRegister = () => {
        setIsModalOpen(true);
        cargarMatriculas;
    };
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <Card>
                    {/* Header */}
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Matrículas</CardTitle>
                            <CardDescription>
                                Gestiona las matrículas de los alumnos
                            </CardDescription>
                        </div>

                        <Button onClick={handleRegister} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Registrar
                        </Button>
                    </CardHeader>

                    {/* Contenido */}
                    <CardContent className="space-y-4">
                        {/* Buscador */}
                        <SearchBar
                            value={filters.search}
                            onChange={(value) => setFilters((prev: any) => ({ ...prev, search: value }))}
                        />

                        <FiltersBar
                            periodo={filters.periodo}
                            area={filters.area}
                            categoria={filters.categoria}
                            onPeriodoChange={(value: any) => setFilters((prev: any) => ({ ...prev, periodo: value }))}
                            onAreaChange={(value: any) => setFilters((prev: any) => ({ ...prev, area: value }))}
                            onCategoriaChange={(value: any) => setFilters((prev: any) => ({ ...prev, categoria: value }))}
                            onSearch={handleSearch}
                        />

                        {/* Tabla */}
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-gray-500">Cargando...</div>
                            </div>
                        ) : (
                            <>
                                <MatriculaTable
                                    data={matriculas}
                                    onSort={handleSort}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onView={handleView}
                                />

                                {/* Footer */}
                                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                                    <span>
                                        Mostrando {paginate.page} de {paginate.total} matrículas 
                                    </span>
                                    <Pagination
                                        currentPage={pagination.pageIndex + 1}
                                        pageSize={pagination.pageSize}
                                        totalItems={paginate.totalPages}
                                        onPageChange={handlePageChange}
                                        onPageSizeChange={handlePageSizeChange}
                                    />
                                </CardFooter>

                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            <MatriculaModal
                isOpen={isModalOpen}
                catalogos={matriculaRegister!}
                registrarMatricula={registrarMatricula}
                onClose={() => setIsModalOpen(false)}
                mode="create"
            />
        </div>

    );

}