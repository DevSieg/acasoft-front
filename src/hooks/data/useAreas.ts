import { API_BASE } from "@/env";
import axios from "axios";
import { useState } from "react";
export interface Area {
    estado: number | null;
    idArea: number;
    areaDetalle: string | null;
};

export const useAreas = () => {
    const [areas, setAreas] = useState<Area[]>([]);

    const cargarAreas = async () => {
        const { data } = await axios.get(`${API_BASE}/areas`);
        setAreas(data);
    };

    const agregarArea = async (data: Omit<Area, "idArea">) => {
        await axios.post(`${API_BASE}/areas`, data);
    };

    const editarArea = async (idArea: number, data: Omit<Area, "idArea">) => {
        await axios.patch(`${API_BASE}/areas/${idArea}`, data);
    };

    return { areas, cargarAreas, agregarArea, editarArea };
};