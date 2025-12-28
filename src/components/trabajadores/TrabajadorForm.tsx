import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Trabajador, TrabajadorFormData } from "./trabajadorDialog";

interface TrabajadorFormProps {
    trabajador?: Trabajador | null;
    onSubmit: (data: TrabajadorFormData) => void;
    onCancel: () => void;
}

export function TrabajadorForm({ trabajador, onSubmit, onCancel }: TrabajadorFormProps) {
    const [formData, setFormData] = useState<TrabajadorFormData>({
        nombre: trabajador?.nombre || '',
        apellido: trabajador?.apellido || '',
        dni: trabajador?.dni || '',
        telefono:trabajador?.telefono || '',
        correo: trabajador?.correo || '',
        tipoPersona: 'TRABAJADOR',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre?formData.nombre:''}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese el nombre"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                    id="apellido"
                    name="apellido"
                    value={formData.apellido?formData.apellido:''}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese el apellido"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="dni">DNI</Label>
                <Input
                    id="dni"
                    name="dni"
                    value={formData.dni?formData.dni:''}
                    onChange={handleChange}
                    required
                    maxLength={8}
                    placeholder="12345678"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="correo">Correo</Label>
                <Input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formData.correo?formData.correo:''}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@correo.com"
                />
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">
                    {trabajador ? 'Actualizar' : 'Registrar'}
                </Button>
            </DialogFooter>
        </form>
    );
}