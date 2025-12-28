import { API_BASE } from "@/env";
import axios from "axios";
import { useState } from "react";


export interface CreateCarreraDto {
    idCarrera?: number;
    nombreCarrera: string | null;
    estado: number | null;
    idArea?: number | null;
    area?: {
        idArea?: number | null;
        areaDetalle?: string | '';
        estado?: number | null;
    };  // Área seleccionada
};
export interface AreaCarrera {
    idArea: number;
    areas: Area;
}
export interface Area {
    idArea: number;
    areaDetalle: string | null;
    estado: number | null;
}

export interface CreateCarreraBody {
    createCarreraDto: CreateCarreraDto;
};

export const useCarreras = () => {
    const [carreras, setCarreras] = useState<CreateCarreraDto[]>([]);

    const cargarCarreras = async () => {
        const { data } = await axios.get(`${API_BASE}/carreras`);
        setCarreras(data);
    };

    const agregarCarrera = async (data: CreateCarreraDto) => {
        if (!data.idArea) {
            throw new Error("Debe seleccionar un área para la carrera");
        }

        const body: CreateCarreraBody = {
            createCarreraDto: {
                nombreCarrera: data.nombreCarrera,
                estado: data.estado,
                idArea: data.idArea
            },
        };

        await axios.post(`${API_BASE}/carreras`, body);
    };


    const editarCarrera = async (idCarrera: number, data: CreateCarreraDto) => {
        await axios.patch(`${API_BASE}/carreras/${idCarrera}`, data);
    };

    return { carreras, cargarCarreras, agregarCarrera, editarCarrera };
};
