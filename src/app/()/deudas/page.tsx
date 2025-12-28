'use client'
import { useAuth } from "@/auth/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSedes } from "@/hooks/data/useSedes";
import { useCaja } from "@/modules/caja/caja.data";
import { CajaAperturaModal } from "@/modules/deudas/components/CajaAperturaModal";
import { DeudaFiltersBar } from "@/modules/deudas/components/DeudaFilter";
import { DeudaPaymentModal } from "@/modules/deudas/components/DeudaPaymentModal";
import { DeudaTable } from "@/modules/deudas/components/DeudaTable";
import { useDeudas } from "@/modules/deudas/deuda.data";
import { DeudaDataDto, DeudaParams } from "@/modules/deudas/deuda.types";
import { Pagination } from "@/modules/matriculas/components/Pagination";
import { Deuda } from "@/modules/matriculas/matricula.data";
import { DollarSign } from "lucide-react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function DeudasPage() {

    const { deudas, paginate, cargarDeudas, buscarDeuda,pagarDeudas } = useDeudas();
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = useState(false)
    const idUsuario = user?.idUsuario;
    // Hook de caja
    const {
        cajaAbierta,
        cajaActual,
        loading: cajaLoading,
        modalCajaOpen,
        setModalCajaOpen,
        verificarCaja,
        aperturarCaja,
    } = useCaja(idUsuario);
    // ✅ Estados de los filtros
    const [search, setSearch] = useState("");
    const [idSede, setIdSede] = useState("all");
    const [loading, setLoading] = useState(true);

    // ✅ Parámetros que se envían al API
    const [params, setParams] = useState<DeudaParams>({
        idSede: null,
        search: null,
        page: 1,
        limit: 10,
    });

    const [selectedDeudaDetail, setSelectedDeudaDetail] = useState(null);

    // ✅ Cargar datos cuando cambien los params
    useEffect(() => {
        cargarDeudas(params);
    }, [params]);

    // ✅ DEBOUNCE: Búsqueda automática al escribir (1 segundo)
    useEffect(() => {
        const timer = setTimeout(() => {
            setParams(prev => ({
                ...prev,
                search: search || null,
                page: 1,
            }));
        }, 1000);

        return () => clearTimeout(timer);
    }, [search]);

    // ✅ Actualizar params cuando cambia la sede
    useEffect(() => {
        setParams(prev => ({
            ...prev,
            idSede: idSede !== "all" ? Number(idSede) : null,
            page: 1,
        }));
    }, [idSede]);

    // Manejar cambio de página
    const handlePageChange = (page: number) => {
        setParams(prev => ({
            ...prev,
            page: page,
        }));
    };

    // Manejar cambio de tamaño de página
    const handlePageSizeChange = (pageSize: number) => {
        setParams(prev => ({
            ...prev,
            limit: pageSize,
            page: 1,
        }));
    };

    // ✅ Búsqueda manual con el botón (opcional)
    const handleSearch = () => {
        setParams(prev => ({
            ...prev,
            search: search || null,
            idSede: idSede !== "all" ? Number(idSede) : null,
            page: 1,
        }));
    };

    const handleView = async (id: number) => {
        try {
            // Llamar a tu API para obtener el detalle de la deuda
            if (!cajaAbierta) {
                toast.error("Debe aperturar una caja antes de ver deudas");
                setModalCajaOpen(true);
                return;
            }
            const response = await buscarDeuda(id);


            setSelectedDeudaDetail(response);
            setModalOpen(true);
        } catch (error) {
            console.error('Error al cargar detalle:', error);
            toast.error("No se pudo cargar el detalle de la deuda");
        }
    };
    const handlePagar = async (idsDeudas: number[]) => {
        await pagarDeudas(idsDeudas,idUsuario)
        setModalOpen(false)
        await cargarDeudas
    }
    if (cajaLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Verificando estado de caja...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            {cajaAbierta && cajaActual && (
                <Alert>
                    {" S/  "}
                    <AlertDescription>
                        Caja abierta - Monto actual: ${cajaActual.total}
                    </AlertDescription>
                </Alert>
            )}
            <div className="max-w-7xl mx-auto">
                <Card>
                    {/* Header */}
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Deudas</CardTitle>
                            <CardDescription>
                                Gestiona las deudas de los alumnos
                            </CardDescription>
                        </div >
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Filtros */}
                        <DeudaFiltersBar
                            search={search}
                            idSede={idSede}
                            onSearchChange={setSearch} // ✅ Actualiza el estado de búsqueda
                            onSedeChange={setIdSede}   // ✅ Actualiza el estado de sede
                            onSearch={handleSearch}     // ✅ Búsqueda manual con botón
                        />

                        {/* Tabla */}
                        <DeudaTable
                            data={deudas}
                            onSort={() => { }}
                            onEdit={(id) => console.log('Editar:', id)}
                            onView={(id) => handleView(id)}
                        />

                        {/* Paginación */}
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                            <span>
                                Mostrando {deudas.length} de {paginate.total} deudas
                            </span>
                            <Pagination
                                currentPage={paginate.page}
                                pageSize={paginate.limit}
                                totalItems={paginate.total}
                                onPageChange={handlePageChange}
                                onPageSizeChange={handlePageSizeChange}
                            />
                        </CardFooter>
                    </CardContent>
                </Card>
            </div>
            <CajaAperturaModal
                open={modalCajaOpen}
                onOpenChange={setModalCajaOpen}
                onAperturar={aperturarCaja}
            />
            <DeudaPaymentModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                data={selectedDeudaDetail}
                onPagar={handlePagar}
            />
        </div>
    );
}