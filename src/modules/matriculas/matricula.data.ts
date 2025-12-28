import { API_BASE } from "@/env";
import axios from "axios";
import { useState } from "react";
import { Matricula, MatriculaRegisterDto } from "./matricula.types";
import { Area } from "@/hooks/data/useAreas";
import { carrera } from "@/models/carrera";
import { periodo } from "@/models/periodo";
import { sede } from "@/models/sede";

export interface Persona {
    idPersona?: number | undefined;
    nombre: string;
    apellido: string;
    dni: string;
    tipoPersona: 'ALUMNO' | 'APODERADO' | string;
    telefono: string;
    correo: string;
}
export interface Alumno extends Persona {
    apoderado?: Persona;
}
export interface Deuda {
    descripcion: string;
    monto: number;
    idConcepto: number;
}
export interface CarreraDto {
    idCarrera: number;
    nombreCarrera: string;
}
export interface PeriodoDto {
    idPeriodo: number;
    periodoDetalle: string;
}
export interface AreaDto {
    idArea: number;
    areaDetalle: string;
    carreras: CarreraDto[];
}
export interface SedeDto {
    idSede: number;
    descripcion: string;
}

export interface MatriculaRegisterData {
    periodos: PeriodoDto[];
    areas: AreaDto[];
    sedes: SedeDto[]
}


export const useMatriculas = () => {
    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [paginate, setPagination] = useState<{ total: number; page: number, limit: number, totalPages: number }>({ total: 0, page: 1, limit: 10, totalPages: 0 });
    const [matriculaRegister, setMatriculaRegister] = useState<MatriculaRegisterData>({
        periodos: [],
        areas: [],
        sedes: []
    });;
    const cargarMatriculas = async () => {
        const { data } = await axios.get(`${API_BASE}/matricula`);
        setPagination(data.pagination);
        setMatriculas(data.data);
    }

    const registrarMatricula = async (data: MatriculaRegisterDto) => {
        await axios.post(`${API_BASE}/matricula`, data);
    }

    const editarMatricula = async () => {

    }

    const cargarDataRegister = async () => {
        const { data } = await axios.get(`${API_BASE}/matricula/create`);
        if (data.success) {
            setMatriculaRegister(data.data);
        }
    }
    return { matriculas, matriculaRegister, paginate, cargarMatriculas, registrarMatricula, editarMatricula, cargarDataRegister };
}