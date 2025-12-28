'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DollarSign, AlertCircle } from "lucide-react";
import { useState } from "react";

interface CajaAperturaModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAperturar: (monto: number) => Promise<void>;
}

export function CajaAperturaModal({
    open,
    onOpenChange,
    onAperturar,
}: CajaAperturaModalProps) {
    const [montoIngresado, setMontoIngresado] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAperturar = async () => {
        // Validaciones
        const monto = parseFloat(montoIngresado);

        if (!montoIngresado || isNaN(monto)) {
            setError("Ingrese un monto válido");
            return;
        }

        if (monto < 0) {
            setError("El monto no puede ser negativo");
            return;
        }

        if (monto === 0) {
            setError("El monto debe ser mayor a 0");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await onAperturar(monto);
            setMontoIngresado("");
            onOpenChange(false);
        } catch (err: any) {
            setError(err.message || "Error al aperturar la caja");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setMontoIngresado("");
            setError("");
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {" S/  "}
                        Apertura de Caja
                    </DialogTitle>
                    <DialogDescription>
                        Ingrese el monto inicial para abrir la caja del día
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="monto">Monto Inicial</Label>
                        <div className="relative">
                            {"S/  "}
                            <Input
                                id="monto"
                                type="number"
                                placeholder="0.00"
                                value={montoIngresado}
                                onChange={(e) => setMontoIngresado(e.target.value)}
                                className="pl-9"
                                step="0.01"
                                min="0"
                                disabled={loading}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !loading) {
                                        handleAperturar();
                                    }
                                }}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Este será el monto con el que iniciará el día
                        </p>
                    </div>

                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Solo puedes tener una caja abierta por día. Una vez aperturada,
                            podrás realizar transacciones.
                        </AlertDescription>
                    </Alert>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleAperturar}
                        disabled={loading || !montoIngresado}
                    >
                        {loading ? "Aperturando..." : "Aperturar Caja"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}