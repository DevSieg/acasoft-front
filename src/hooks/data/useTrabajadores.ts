import { useState, useMemo } from "react";
import axios from "axios";
import { API_BASE } from "@/env";
import { Trabajador, TrabajadorFormData } from "@/components/trabajadores/trabajadorDialog";

// Cambia esta URL base por la de tu API ASP.NET Core

export function useTrabajadores() {
    const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🧠 Cargar todos los trabajadores
    const cargarTrabajadores = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<Trabajador[]>(`${API_BASE}/trabajadores`);
            setTrabajadores(response.data);
        } catch (err: any) {
            console.error("Error al cargar trabajadores:", err);
            setError("No se pudieron cargar los trabajadores");
        } finally {
            setLoading(false);
        }
    };

    // 🧮 Filtrado dinámico (en cliente)
    const filtrados = useMemo(() => {
        return trabajadores.filter((t) =>
            [t.nombre, t.apellido, t.dni, t.correo]
                .some((v) => v?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [trabajadores, searchTerm]);

    // ➕ Agregar trabajador
    const agregarTrabajador = async (data: TrabajadorFormData) => {
        try {
            setLoading(true);
            const response = await axios.post<Trabajador>(`${API_BASE}/trabajadores`, data);
            setTrabajadores((prev) => [...prev, response.data]);
        } catch (err: any) {
            console.error("Error al agregar trabajador:", err);
            setError("No se pudo agregar el trabajador");
        } finally { 
            setLoading(false);
        }
    };

    // ✏️ Editar trabajador
    const editarTrabajador = async (id: number, data: TrabajadorFormData) => {
        try {
            setLoading(true);
            await axios.patch(`${API_BASE}/trabajadores/${id}`, data);
            setTrabajadores((prev) =>
                prev.map((t) => (t.idPersona === id ? { ...t, ...data } : t))
            );
        } catch (err: any) {
            console.error("Error al editar trabajador:", err);
            setError("No se pudo editar el trabajador");
        } finally {
            setLoading(false);
        }
    };

    // ❌ Eliminar trabajador
    const eliminarTrabajador = async (id: number) => {
        try {
            setLoading(true);
            await axios.delete(`${API_BASE}/${id}`);
            setTrabajadores((prev) => prev.filter((t) => t.idPersona !== id));
        } catch (err: any) {
            console.error("Error al eliminar trabajador:", err);
            setError("No se pudo eliminar el trabajador");
        } finally {
            setLoading(false);
        }
    };

    return {
        trabajadores,
        filtrados,
        searchTerm,
        setSearchTerm,
        cargarTrabajadores,
        agregarTrabajador,
        editarTrabajador,
        eliminarTrabajador,
        loading,
        error,
    };
}
