import { API_BASE } from "@/env";
import axios from "axios";
import { useState } from "react";
export interface rol {
    idRol?: number | null;
    estado: number | null;
    descripcion: string | null;
}
export function useRoles() {
    const [roles, setUsuarios] = useState<rol[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const cargarRoles = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE}/roles`);
            setUsuarios(response.data);
        } catch (err: any) {
            console.error("Error al cargar usuarios:", err);
            setError("No se pudieron cargar los usuarios");
        } finally {
            setLoading(false);
        }
    }
    const asignarRolUsuario = async (usuarioId: number, rolId: number) => {
        try {
            const response = await axios.post(`${API_BASE}/usuario-rol`, {
                idUsuario: usuarioId,
                idRol: rolId,
            });

            console.log("Rol asignado correctamente:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error al asignar el rol:", error.response?.data || error.message);
            throw error;
        }
    };

    const agregarRol = async (data: rol) => {
        try {
            const response = await axios.post(`${API_BASE}/roles`, {
                descripcion: data.descripcion,
                estado: data.estado
            });
            return response.data;
        } catch (error) {
            console.error("Error agregando rol:", error);
            throw error;
        }
    };

    const editarRol = async (rolId: number, rolData: rol) => {
        try {
            const response = await axios.patch(`${API_BASE}/roles/${rolId}`, {
                descripcion: rolData.descripcion,
                estado: rolData.estado
            });
            return response.data;
        } catch (error) {
            console.error("Error editando rol:", error);
            throw error;
        }
    };


    return {
        roles,
        loading,
        error,
        cargarRoles,
        agregarRol,
        editarRol,
        asignarRolUsuario
    }
}