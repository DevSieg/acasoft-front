import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Usuario, UsuarioFormData } from "./usuarioDialog";

interface UsuarioFormProps {
    usuario: Usuario | null;
    onSubmit: (data: UsuarioFormData) => void;
    onCancel: () => void;
}

export function UsuarioForm({ usuario, onSubmit, onCancel }: UsuarioFormProps) {
    const [formData, setFormData] = useState<UsuarioFormData>({
        usuario: usuario?.usuario ?? "",
        correo: usuario?.correo ?? "",
        password: "",
        estado: usuario?.estado ?? true,
        rol: usuario?.rol ?? "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
                <Label>Usuario</Label>
                <Input
                    name="usuario"
                    value={formData.usuario ?? ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label>Correo</Label>
                <Input
                    name="correo"
                    type="email"
                    value={formData.correo ?? ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {!usuario && (
                <div>
                    <Label>Contraseña</Label>
                    <Input
                        name="password"
                        type="password"
                        value={formData.password ?? ""}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit">{usuario ? "Guardar" : "Registrar"}</Button>
            </div>
        </form>
    );
}
