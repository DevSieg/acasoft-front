'use client'
import PersonaComponent, { Persona, PersonaFormData } from "@/components/personas/PersonaComponent";
import { useState } from "react";

export default function DocenteView() {
    const [personas, setPersonas] = useState<Persona[]>([
        {
            idPersona: 1,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',
            telefono: '987654321',
            correo: 'juan@example.com',
            tipoPersona: 'Docente',
        },
        {
            idPersona: 2,
            nombre: 'María',
            apellido: 'García',
            dni: '87654321',
            telefono: '912345678',
            correo: 'maria@example.com',
            idApoderado: 1,
            tipoPersona: 'Alumno',
        },
        {
            idPersona: 3,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',
            telefono: '987654321',
            correo: 'juan@example.com',
            tipoPersona: 'Docente',
        },
        {
            idPersona: 4,
            nombre: 'María',
            apellido: 'García',
            dni: '87654321',
            telefono: '912345678',
            correo: 'maria@example.com',
            idApoderado: 1,
            tipoPersona: 'Alumno',
        },
        {
            idPersona: 5,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',
            telefono: '987654321',
            correo: 'juan@example.com',
            tipoPersona: 'Docente',
        },
        {
            idPersona: 6,
            nombre: 'María',
            apellido: 'García',
            dni: '87654321',
            telefono: '912345678',
            correo: 'maria@example.com',
            idApoderado: 1,
            tipoPersona: 'Alumno',
        },
        {
            idPersona: 7,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',
            telefono: '987654321',
            correo: 'juan@example.com',
            tipoPersona: 'Docente',
        },
        {
            idPersona: 8,
            nombre: 'María',
            apellido: 'García',
            dni: '87654321',
            telefono: '912345678',
            correo: 'maria@example.com',
            idApoderado: 1,
            tipoPersona: 'Alumno',
        },{
            idPersona: 9,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',
            telefono: '987654321',
            correo: 'juan@example.com',
            tipoPersona: 'Docente',
        },
        {
            idPersona: 10,
            nombre: 'María',
            apellido: 'García',
            dni: '87654321',
            telefono: '912345678',
            correo: 'maria@example.com',
            idApoderado: 1,
            tipoPersona: 'Alumno',
        },
        {
            idPersona: 11,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',
            telefono: '987654321',
            correo: 'juan@example.com',
            tipoPersona: 'Docente',
        },
        {
            idPersona: 12,
            nombre: 'María',
            apellido: 'García',
            dni: '87654321',
            telefono: '912345678',
            correo: 'maria@example.com',
            idApoderado: 1,
            tipoPersona: 'Docente',
        },
    ]);

    const handleCrear = async (data: PersonaFormData) => {
        // Simular llamada API
        const nuevaPersona: Persona = {
            idPersona: personas.length + 1,
            ...data,
            idApoderado: data.idApoderado ? parseInt(data.idApoderado) : undefined,
            tipoPersona: 'Docente',
        };
        setPersonas([...personas, nuevaPersona]);
    };

    const handleEditar = async (id: number, data: PersonaFormData) => {
        setPersonas(
            personas.map((p) =>
                p.idPersona === id
                    ? {
                        ...p,
                        ...data,
                        idApoderado: data.idApoderado ? parseInt(data.idApoderado) : undefined,
                    }
                    : p
            )
        );
    };

    const handleEliminar = async (id: number) => {
        setPersonas(personas.filter((p) => p.idPersona !== id));
    };

    return (
        <div className="container mx-auto p-6">
            <PersonaComponent
                tipoPersona="Docente"
                personas={personas.filter((p) => p.tipoPersona === 'Docente')}
                onCrear={handleCrear}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
            />
        </div>
    );
}