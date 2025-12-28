import { API_BASE } from "@/env";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Caja {
    idCaja: number;
    idUsuario: number;
    montoAnterior: number;
    montoIngresado: number;
    total: number;
    estado: number;
    fechaCaja: string;
}

interface VerificarCajaResponse {
    data: {
        abierta: boolean;
        caja: Caja | null;
    }
}
export function useCaja(idUsuario: number) {
    const [cajaAbierta, setCajaAbierta] = useState(false);
    const [cajaActual, setCajaActual] = useState<Caja | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalCajaOpen, setModalCajaOpen] = useState(false);

    // Verificar si hay caja abierta al cargar
    const verificarCaja = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/caja/verificar-apertura/${idUsuario}`);
            const data: VerificarCajaResponse = await response.json();
            console.log(data)
            setCajaAbierta(data.data.abierta);
            setCajaActual(data.data.caja);
            // Si no hay caja abierta, mostrar modal
            if (!data.data.abierta) {
                setModalCajaOpen(true);
            }
        } catch (error) {
            console.error('Error al verificar caja:', error);
            toast.error("Error al verificar estado de caja");
        } finally {
            setLoading(false);
        }
    };

    // Aperturar caja
    const aperturarCaja = async (montoIngresado: number) => {
        try {
            const response = await fetch(`${API_BASE}/caja`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idUsuario,
                    montoIngresado,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error al aperturar caja');
            }

            const caja = await response.json();
            setCajaAbierta(true);
            setCajaActual(caja);

            toast.success("Caja aperturada correctamente", {
                description: `Monto inicial:  S/${montoIngresado.toFixed(2)}`,
            });

            return caja;
        } catch (error: any) {
            toast.error("Error al aperturar caja", {
                description: error.message,
            });
            throw error;
        }
    };

    useEffect(() => {
        if (idUsuario) {
            verificarCaja();
        }
    }, [idUsuario]);

    return {
        cajaAbierta,
        cajaActual,
        loading,
        modalCajaOpen,
        setModalCajaOpen,
        verificarCaja,
        aperturarCaja,
    };
}