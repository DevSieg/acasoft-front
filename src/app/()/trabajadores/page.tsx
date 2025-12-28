'use client';
import { SearchBar } from "@/components/trabajadores/SearchBar";
import { Trabajador, TrabajadorDialog, TrabajadorFormData } from "@/components/trabajadores/trabajadorDialog";
import { TrabajadoresTable } from "@/components/trabajadores/TrabajadoresTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {useTrabajadores} from '@/hooks/data/useTrabajadores';
export default function TrabajadoresView() {
    const {trabajadores,agregarTrabajador,editarTrabajador,cargarTrabajadores} = useTrabajadores();
    const [trabajador,setTrabajador] = useState<Trabajador[]>([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editando, setEditando] = useState<Trabajador| null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filtrados = trabajadores.filter((t) =>
        [t.nombre, t.apellido, t.dni, t.correo]
            .some((v) => v?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleNuevo = () => {
        setEditando(null);
        setDialogOpen(true);
    };

    const handleEditar = (t: Trabajador) => {
        setEditando(t);
        setDialogOpen(true);
    };

    const handleSubmit = async (data: TrabajadorFormData) => {
        if (editando) {
            await editarTrabajador(editando.idPersona?editando.idPersona:0, data);
        } else {
            const nuevoTrabajador: TrabajadorFormData = {
            ...data,
            password: "password", // 🔑 Puedes poner un valor por defecto o generado
        };
            await agregarTrabajador(nuevoTrabajador)
        }
        setDialogOpen(false);
        setEditando(null);
        await cargarTrabajadores(); // recarga los datos actualizados
    };

    const handleEliminar = (id: number) => {
        if (window.confirm('¿Deseas eliminar este trabajador?')) {
            setTrabajador((prev) => prev.filter((t) => t.idPersona !== id));
        }
    };
    useEffect(()=>{
        cargarTrabajadores();
        
},[])

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle className="text-2xl font-bold">
                            Gestión de Trabajadores
                        </CardTitle>
                        <CardDescription>
                            Administra los trabajadores del sistema
                        </CardDescription>
                    </div>
                    <Button onClick={handleNuevo}>
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Trabajador
                    </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />

                    <TrabajadoresTable
                        trabajadores={filtrados}
                        onEdit={handleEditar}
                        onDelete={handleEliminar}
                    />

                    <p className="text-sm text-muted-foreground">
                        Mostrando {filtrados.length} de {trabajadores.length} trabajadores
                    </p>
                </CardContent>
            </Card>

            <TrabajadorDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                trabajador={editando}
                onSubmit={handleSubmit}
            />
        </div>
    );
}