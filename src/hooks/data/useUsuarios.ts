import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/env";
import { Usuario, UsuarioFormData } from "@/components/usuarios/usuarioDialog";

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // 🔹 Cargar usuarios
    const cargarUsuarios = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE}/usuarios`);
            setUsuarios(response.data);
        } catch (err: any) {
            console.error("Error al cargar usuarios:", err);
            setError("No se pudieron cargar los usuarios");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Agregar nuevo usuario
    const agregarUsuario = async (data: UsuarioFormData) => {
        try {
            setLoading(true);
            const response = await axios.post(API_BASE, data);
            setUsuarios((prev) => [...prev, response.data]);
        } catch (err: any) {
            console.error("Error al agregar usuario:", err);
            setError("No se pudo agregar el usuario");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Editar usuario
    const editarUsuario = async (id: number, data: UsuarioFormData) => {
        try {
            setLoading(true);
            await axios.patch(`${API_BASE}/${id}`, data);
            setUsuarios((prev) =>
                prev.map((u) => (u.idUsuario === id ? { ...u, ...data } : u))
            );
        } catch (err: any) {
            console.error("Error al editar usuario:", err);
            setError("No se pudo editar el usuario");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Eliminar usuario
    const eliminarUsuario = async (id: number) => {
        try {
            setLoading(true);
            await axios.delete(`${API_BASE}/${id}`);
            setUsuarios((prev) => prev.filter((u) => u.idUsuario !== id));
        } catch (err: any) {
            console.error("Error al eliminar usuario:", err);
            setError("No se pudo eliminar el usuario");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Asignar rol a usuario
    const asignarRol = async (id: number, rol: string) => {
        try {
            setLoading(true);
            await axios.patch(`${API_BASE}/${id}/rol`, { rol });
            setUsuarios((prev) =>
                prev.map((u) => (u.idUsuario === id ? { ...u, rol } : u))
            );
        } catch (err: any) {
            console.error("Error al asignar rol:", err);
            setError("No se pudo asignar el rol");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    return {
        usuarios,
        loading,
        error,
        cargarUsuarios,
        agregarUsuario,
        editarUsuario,
        eliminarUsuario,
        asignarRol,
    };
}
