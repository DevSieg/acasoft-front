'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DollarSign, User, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

interface Deuda {
    idDeuda: number;
    descripcion: string;
    monto: number;
    conceptos: {
        descripcion: string;
    };
}

interface DeudaDetail {
    deudas: Deuda[];
    alumno: {
        idPersona: number;
        nombre: string;
        apellido: string;
        dni: string;
    };
    periodos: {
        periodoDetalle: string;
    };
    sedes: {
        descripcion: string;
    };
}

interface DeudaPaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: DeudaDetail | null;
    onPagar: (idsDeudas: number[]) => Promise<void>;
}

export function DeudaPaymentModal({
    open,
    onOpenChange,
    data,
    onPagar,
}: DeudaPaymentModalProps) {
    const [selectedDeudas, setSelectedDeudas] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    if (!data) return null;

    // Calcular total seleccionado
    const totalSeleccionado = data.deudas
        .filter(deuda => selectedDeudas.includes(deuda.idDeuda))
        .reduce((sum, deuda) => sum + deuda.monto, 0);

    // Manejar selección individual
    const handleToggleDeuda = (idDeuda: number) => {
        setSelectedDeudas(prev =>
            prev.includes(idDeuda)
                ? prev.filter(id => id !== idDeuda)
                : [...prev, idDeuda]
        );
    };

    // Seleccionar todas
    const handleSelectAll = () => {
        if (selectedDeudas.length === data.deudas.length) {
            setSelectedDeudas([]);
        } else {
            setSelectedDeudas(data.deudas.map(d => d.idDeuda));
        }
    };

    // Procesar pago
    const handlePagar = async () => {
        if (selectedDeudas.length === 0) return;

        setLoading(true);
        try {
            await onPagar(selectedDeudas);
            setSelectedDeudas([]);
            onOpenChange(false);
        } catch (error) {
            console.error('Error al procesar pago:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Detalles de Deuda</DialogTitle>
                    <DialogDescription>
                        Selecciona las deudas que deseas pagar
                    </DialogDescription>
                </DialogHeader>

                {/* Información del Alumno */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4  shadow-sm rounded-lg">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Alumno</p>
                                <p className="text-sm text-muted-foreground">
                                    {data.alumno.nombre} {data.alumno.apellido}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">DNI</p>
                                <p className="text-sm text-muted-foreground">
                                    {data.alumno.dni}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Período</p>
                                <p className="text-sm text-muted-foreground">
                                    {data.periodos.periodoDetalle}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Sede</p>
                                <p className="text-sm text-muted-foreground">
                                    {data.sedes.descripcion}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Deudas */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Deudas Pendientes</h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSelectAll}
                            >
                                {selectedDeudas.length === data.deudas.length
                                    ? "Deseleccionar todas"
                                    : "Seleccionar todas"}
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {data.deudas.map((deuda) => (
                                <div
                                    key={deuda.idDeuda}
                                    className={`
                                        flex items-center justify-between p-4 rounded-lg border
                                        transition-colors cursor-pointer
                                        ${selectedDeudas.includes(deuda.idDeuda)
                                            ? 'bg-primary/5 border-primary'
                                            : 'hover:bg-gray-400'
                                        }
                                    `}
                                    onClick={() => handleToggleDeuda(deuda.idDeuda)}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <Checkbox
                                            checked={selectedDeudas.includes(deuda.idDeuda)}
                                            onCheckedChange={() => handleToggleDeuda(deuda.idDeuda)}
                                            onClick={(e:any) => e.stopPropagation()}
                                        />

                                        <div className="flex-1">
                                            <p className="font-medium">{deuda.descripcion}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {deuda.conceptos.descripcion}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1 font-semibold">
                                            PEN {"  "}
                                            {deuda.monto.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between p-4 shadow-sm rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                {selectedDeudas.length} deuda(s) seleccionada(s)
                            </p>
                            <p className="text-2xl font-bold">
                                Total: ${totalSeleccionado.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handlePagar}
                        disabled={selectedDeudas.length === 0 || loading}
                    >
                        {loading ? "Procesando..." : `Pagar ${selectedDeudas.length} deuda(s)`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}