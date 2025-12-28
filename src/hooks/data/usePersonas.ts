import { Persona } from "@/components/personas/PersonaComponent"
import { API_BASE } from "@/env";
import axios from "axios";
import { useState } from "react"

export const usePersonas = () => {
    const [personas, setPersonas] = useState<Persona[]>([]);

    const cargarPersonas = async (tipoPersona: string) => {
        const { data } = await axios.get(`${API_BASE}/persona/${tipoPersona}`)
        setPersonas(data);
    }
    const agregarPersona = async (data: Omit<Persona, 'idPersona'>) => {
        await axios.post(`${API_BASE}/persona`, {
            nombre: data.nombre,
            apellido: data.apellido,
            dni: data.dni,
            tipoPersona: data.tipoPersona,
            telefono: data.telefono,
            correo: data.correo,
            idApoderado: data.idApoderado,
        }
        );
    }
    return { personas, cargarPersonas, agregarPersona };
}