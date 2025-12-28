'use client'
import PersonaComponent, { Persona, PersonaFormData } from "@/components/personas/PersonaComponent";
import { usePersonas } from "@/hooks/data/usePersonas";
import { useEffect, useState } from "react";

export default function AlumnoView() {
    const {personas,cargarPersonas,agregarPersona} = usePersonas();
    useEffect(()=>{
        cargarPersonas('Alumno');
    },[])

    const handleCrear = async (data: PersonaFormData) => {
        const dat = {...data,tipoPersona: 'ALUMNO', idApoderado: data.idApoderado==0? null:data.idApoderado};
        await agregarPersona(dat);
        await cargarPersonas('Alumno');
    };

    const handleEditar = async (id: number, data: PersonaFormData) => {
        
    };

    const handleEliminar = async (id: number) => {
        
    };

    return (
        <div className="container mx-auto p-6">
            <PersonaComponent
                tipoPersona="Alumno"
                personas={personas.filter((p) => p.tipoPersona === 'ALUMNO')}
                onCrear={handleCrear}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
            />
        </div>
    );
}