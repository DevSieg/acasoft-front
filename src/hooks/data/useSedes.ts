import { API_BASE } from "@/env";
import axios from "axios";
import { useState } from "react";
export interface CreateSedeDto {
    idSede?: number | null;
    estado: number | null;
    descripcion: string | null;
    telefono: string | null;
    correo: string | null;
    direccion: string | null;
};

export function useSedes() {
    const [sedes, setSedes] = useState<CreateSedeDto[]>([]);
    const cargarSedes = async () => {
        try {
            const { data } = await axios.get(`${API_BASE}/sedes`);
            console.log(data)
            setSedes(data);
        } catch (error) {
            console.error("Error cargando sedes:", error);
        }
    };

    const agregarSede = async (data: CreateSedeDto) => {
        try {
            const response = await axios.post(`${API_BASE}/sedes`, {
                estado: data.estado,
                descripcion: data.descripcion,
                telefono: data.telefono,
                correo: data.correo,
                direccion: data.direccion
            });
            return response.data;
        } catch (error) {
            console.error("Error agregando sede:", error);
            throw error;
        }
    };

    const editarSede = async (sedeId: number, data: CreateSedeDto) => {
        try {
            await axios.patch(`${API_BASE}/sedes/${sedeId}`, data);
        } catch (error) {
            console.error("Error editando sede:", error);
            throw error;
        }
    };

    return {
        sedes,
        cargarSedes,
        agregarSede,
        editarSede
    }
}