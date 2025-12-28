import { useState } from "react";
import { DeudaDataDto, DeudaParams } from "./deuda.types";
import axios from "axios";
import { API_BASE } from "@/env";
import { toast } from "sonner";

export const useDeudas = () => {
    const [deudas, setDeudas] = useState<DeudaDataDto[]>([]);
    const [paginate, setPagination] = useState<{ total: number; page: number, limit: number, totalPages: number }>({ total: 0, page: 1, limit: 10, totalPages: 0 });
    const cargarDeudas = async (params: DeudaParams) => {
        console.log(params)
        const { data } = await axios.get(`${API_BASE}/deudas`, {
            params: params
        });
        setPagination(data.pagination);
        setDeudas(data.data);
    }
    const buscarDeuda = async (id: number) => {
        const { data } = await axios.get(`${API_BASE}/deudas/${id}`)
        return data;
    }
    const pagarDeudas = async (idsDeudas: number[], idUsuario: number) => {
        const { data } = await axios.post(
            `${API_BASE}/deudas/pagar-deudas/${idUsuario}`,
            idsDeudas // 👈 BODY: array de IDs
        );
        toast.success("Pago realizado correctamente", {
                description: `Pag`,
            });

        return data;

    }


    return { deudas, paginate, cargarDeudas, buscarDeuda,pagarDeudas};
}