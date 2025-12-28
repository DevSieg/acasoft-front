import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Tipos
export interface Persona {
    idPersona: number;
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    correo: string;
    idApoderado?: number| null;
    tipoPersona: string;
}

export interface PersonaFormData {
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    correo: string;
    idApoderado?: number;
}

export interface PersonasTableProps {
    tipoPersona: 'Trabajador' | 'Docente' | 'Alumno';
    personas: Persona[];
    onCrear: (data: PersonaFormData) => Promise<void>;
    onEditar: (id: number, data: PersonaFormData) => Promise<void>;
    onEliminar: (id: number) => Promise<void>;
}

const PersonaComponet: React.FC<PersonasTableProps> = ({
    tipoPersona,
    personas,
    onCrear,
    onEditar,
    onEliminar,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
    const [formData, setFormData] = useState<PersonaFormData>({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        correo: '',
        idApoderado: 0,
    });

    const resetForm = () => {
        setFormData({
            nombre: '',
            apellido: '',
            dni: '',
            telefono: '',
            correo: '',
            idApoderado: 0,
        });
        setSelectedPersona(null);
        setIsEditMode(false);
    };

    const handleOpenCreate = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const handleOpenEdit = (persona: Persona) => {
        setFormData({
            nombre: persona.nombre,
            apellido: persona.apellido,
            dni: persona.dni,
            telefono: persona.telefono,
            correo: persona.correo,
            idApoderado: persona.idApoderado || 0,
        });
        setSelectedPersona(persona);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode && selectedPersona) {
                await onEditar(selectedPersona.idPersona, formData);
            } else {
                await onCrear(formData);
            }
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('¿Está seguro de eliminar esta persona?')) {
            try {
                await onEliminar(id);
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Mostrar campo apoderado solo para alumnos
    const mostrarApoderado = tipoPersona === 'Alumno';

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Gestión de {tipoPersona}s</h1>
                <Button onClick={handleOpenCreate} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nuevo {tipoPersona}
                </Button>
            </div>

            {/* Tabla */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Apellido</TableHead>
                            <TableHead>DNI</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Correo</TableHead>
                            {mostrarApoderado && <TableHead>ID Apoderado</TableHead>}
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {personas.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={mostrarApoderado ? 8 : 7}
                                    className="text-center text-muted-foreground py-8"
                                >
                                    No hay {tipoPersona.toLowerCase()}s registrados
                                </TableCell>
                            </TableRow>
                        ) : (
                            personas.map((persona) => (
                                <TableRow key={persona.idPersona}>
                                    <TableCell>{persona.idPersona}</TableCell>
                                    <TableCell>{persona.nombre}</TableCell>
                                    <TableCell>{persona.apellido}</TableCell>
                                    <TableCell>{persona.dni}</TableCell>
                                    <TableCell>{persona.telefono}</TableCell>
                                    <TableCell>{persona.correo}</TableCell>
                                    {mostrarApoderado && (
                                        <TableCell>{persona.idApoderado || '-'}</TableCell>
                                    )}
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenEdit(persona)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(persona.idPersona)}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            {isEditMode ? 'Editar' : 'Nuevo'} {tipoPersona}
                        </DialogTitle>
                        <DialogDescription>
                            Complete los datos del {tipoPersona.toLowerCase()}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    maxLength={100}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="apellido">Apellido</Label>
                                <Input
                                    id="apellido"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleInputChange}
                                    maxLength={100}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="dni">DNI</Label>
                                <Input
                                    id="dni"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleInputChange}
                                    maxLength={8}
                                    pattern="[0-9]{8}"
                                    placeholder="12345678"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="telefono">Teléfono</Label>
                                <Input
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    maxLength={9}
                                    pattern="[0-9]{9}"
                                    placeholder="987654321"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="correo">Correo</Label>
                                <Input
                                    id="correo"
                                    name="correo"
                                    type="email"
                                    value={formData.correo}
                                    onChange={handleInputChange}
                                    maxLength={100}
                                    required
                                />
                            </div>
                            {mostrarApoderado && (
                                <div className="grid gap-2">
                                    <Label htmlFor="idApoderado">ID Apoderado (opcional)</Label>
                                    <Input
                                        id="idApoderado"
                                        name="idApoderado"
                                        type="number"
                                        value={formData.idApoderado}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit">
                                {isEditMode ? 'Guardar Cambios' : 'Crear'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default PersonaComponet;