import React, { useState } from 'react';
import { Search, User, Users, GraduationCap, CreditCard, Save, X, Loader2 } from 'lucide-react';
import { CarreraDto, MatriculaRegisterData } from '../matricula.data';
import { describe } from 'node:test';
import { useAuth } from '@/auth/AuthContext';

// ============= TIPOS =============
interface AlumnoData {
    dni: string;
    nombre: string;
    apellido: string;
    telefono: string;
}

interface ApoderadoData {
    dni: string;
    nombre: string;
    apellido: string;
    telefono: string;
}

interface DatosAcademicos {
    idPeriodo: number;
    idCarrera: number;
    idArea: number;
    idSede: number;
}

interface Cuota {
    id: string;
    descripcion: string;
    monto: number;
    idConcepto: number;
    fechaVencimiento: string;
}

interface InformacionPago {
    categoria: number;
    monto: number;
    formaPago: 'contado' | 'cuotas';
    numeroCuotas?: number;
    cuotas: Cuota[];
}

interface MatriculaFormData {
    alumno: AlumnoData;
    apoderado: ApoderadoData;
    datosAcademicos: DatosAcademicos;
    informacionPago: InformacionPago;
}

// ============= COMPONENTE: DatosAlumno =============
interface DatosAlumnoProps {
    data: AlumnoData;
    onChange: (data: AlumnoData) => void;
    onBuscarDni: (dni: string) => void;
}

function DatosAlumno({ data, onChange, onBuscarDni }: DatosAlumnoProps) {
    const [searching, setSearching] = useState(false);

    const handleBuscar = async () => {
        setSearching(true);
        await onBuscarDni(data.dni);
        setSearching(false);
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Datos del Alumno</h3>
                    <p className="text-sm text-gray-500">Información personal del estudiante</p>
                </div>
            </div>

            <div className="space-y-6 p-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        DNI <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={data.dni}
                            onChange={(e) => onChange({ ...data, dni: e.target.value })}
                            placeholder="Ingrese DNI"
                            className="flex h-10 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            maxLength={8}
                        />
                        <button
                            onClick={handleBuscar}
                            disabled={searching || data.dni.length < 8}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {searching ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Search className="h-4 w-4" />
                            )}
                            {searching ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => onChange({ ...data, nombre: e.target.value })}
                            placeholder="Nombre del alumno"
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Apellido <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.apellido}
                            onChange={(e) => onChange({ ...data, apellido: e.target.value })}
                            placeholder="Apellido del alumno"
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Teléfono <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={data.telefono}
                            onChange={(e) => onChange({ ...data, telefono: e.target.value })}
                            placeholder="999 999 999"
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============= COMPONENTE: DatosApoderado =============
interface DatosApoderadoProps {
    data: ApoderadoData;
    onChange: (data: ApoderadoData) => void;
}

function DatosApoderado({ data, onChange }: DatosApoderadoProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                    <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Datos del Apoderado</h3>
                    <p className="text-sm text-gray-500">Información del responsable del estudiante</p>
                </div>
            </div>

            <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Dni <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.dni}
                            onChange={(e) => onChange({ ...data, dni: e.target.value })}
                            placeholder="Nombre del apoderado"
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => onChange({ ...data, nombre: e.target.value })}
                            placeholder="Nombre del apoderado"
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Apellido <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.apellido}
                            onChange={(e) => onChange({ ...data, apellido: e.target.value })}
                            placeholder="Apellido del apoderado"
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Teléfono <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={data.telefono}
                            onChange={(e) => onChange({ ...data, telefono: e.target.value })}
                            placeholder="999 999 999"
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export interface DatosAcademicosFormData {
    idPeriodo: number;
    idArea: number;
    idCarrera: number;
    idSede: number;
}
// ============= COMPONENTE: DatosAcademicos =============
interface DatosAcademicosProps {
    data: DatosAcademicosFormData;
    catalogos: MatriculaRegisterData; // JSON completo
    onChange: (data: DatosAcademicosFormData) => void;
}


function DatosAcademicosForm({ catalogos, data, onChange }: DatosAcademicosProps) {
    const { periodos, areas, sedes } = catalogos;

    // 🔹 Carreras según área seleccionada
    const carrerasDisponibles: CarreraDto[] =
        areas.find(a => a.idArea === data.idArea)?.carreras ?? [];

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Datos Académicos</h3>
                    <p className="text-sm text-gray-500">Información de la matrícula académica</p>
                </div>
            </div>

            <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2">

                    {/* PERIODO */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Período <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.idPeriodo ?? ''}
                            onChange={(e) =>
                                onChange({ ...data, idPeriodo: Number(e.target.value) })
                            }
                            className="flex h-10 w-full rounded-md border px-3 text-sm"
                        >
                            <option value="">Seleccione período</option>
                            {periodos.map(p => (
                                <option key={p.idPeriodo} value={p.idPeriodo}>
                                    {p.periodoDetalle}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* AREA */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Área <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.idArea ?? ''}
                            onChange={(e) =>
                                onChange({
                                    ...data,
                                    idArea: Number(e.target.value),
                                    idCarrera: 0 // 🔥 reset carrera
                                })
                            }
                            className="flex h-10 w-full rounded-md border px-3 text-sm"
                        >
                            <option value="">Seleccione área</option>
                            {areas.map(a => (
                                <option key={a.idArea} value={a.idArea}>
                                    {a.areaDetalle}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* CARRERA (DEPENDIENTE) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Carrera <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.idCarrera ?? ''}
                            disabled={!data.idArea}
                            onChange={(e) =>
                                onChange({ ...data, idCarrera: Number(e.target.value) })
                            }
                            className="flex h-10 w-full rounded-md border px-3 text-sm disabled:bg-gray-100"
                        >
                            <option value="">Seleccione carrera</option>
                            {carrerasDisponibles.map(c => (
                                <option key={c.idCarrera} value={c.idCarrera}>
                                    {c.nombreCarrera}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SEDE */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Sede <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.idSede ?? ''}
                            onChange={(e) =>
                                onChange({ ...data, idSede: Number(e.target.value) })
                            }
                            className="flex h-10 w-full rounded-md border px-3 text-sm"
                        >
                            <option value="">Seleccione sede</option>
                            {sedes.map(s => (
                                <option key={s.idSede} value={s.idSede}>
                                    {s.descripcion}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}


// ============= COMPONENTE: InformacionPago =============
interface InformacionPagoProps {
    data: InformacionPago;
    onChange: (data: InformacionPago) => void;
}

function InformacionPagoForm({ data, onChange }: InformacionPagoProps) {
    const CATEGORIAS = [
        {
            id: 1,
            detalle: 'Regular'
        }
        , {
            id: 2,
            detalle: 'Becado 50%'
        }, {
            id: 3,
            detalle: 'Becado 100%'
        }
        , {
            id: 4,
            detalle: 'Especial'
        }];

    const generarCuotas = (numeroCuotas: number, montoTotal: number) => {
        const montoPorCuota = Math.round((montoTotal / numeroCuotas) * 100) / 100;
        const cuotas: Cuota[] = [];
        const fechaBase = new Date();

        for (let i = 0; i < numeroCuotas; i++) {
            const fecha = new Date(fechaBase);
            fecha.setMonth(fecha.getMonth() + i + 1);

            cuotas.push({
                id: `cuota-${i + 1}`,
                descripcion: `CUOTA ${i + 1}`,
                monto: montoPorCuota,
                idConcepto: 1,
                fechaVencimiento: fecha.toISOString().split('T')[0],
            });
        }

        return cuotas;
    };

    const handleFormaPagoChange = (formaPago: 'contado' | 'cuotas') => {
        if (formaPago === 'cuotas') {
            const cuotas = generarCuotas(3, data.monto);
            onChange({ ...data, formaPago, numeroCuotas: 3, cuotas });
        } else {
            onChange({ ...data, formaPago, numeroCuotas: undefined, cuotas: [] });
        }
    };

    const handleNumeroCuotasChange = (numeroCuotas: number) => {
        const cuotas = generarCuotas(numeroCuotas, data.monto);
        onChange({ ...data, numeroCuotas, cuotas });
    };

    const handleCuotaChange = (index: number, monto: number) => {
        const nuevasCuotas = [...data.cuotas];
        nuevasCuotas[index] = { ...nuevasCuotas[index], monto };
        onChange({ ...data, cuotas: nuevasCuotas });
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Información de Pago</h3>
                    <p className="text-sm text-gray-500">Detalles del pago y cuotas</p>
                </div>
            </div>

            <div className="space-y-6 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Categoría <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={data.categoria}
                            onChange={(e) => onChange({ ...data, categoria: Number(e.target.value) })}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            <option value="">Seleccione categoría</option>
                            {CATEGORIAS.map((c) => (
                                <option key={c.id} value={c.id}>{c.detalle}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Monto Total <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={data.monto}
                            onChange={(e) => onChange({ ...data, monto: parseFloat(e.target.value) || 0 })}
                            placeholder="0.00"
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            step="0.01"
                            min="0"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                        Forma de Pago <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="formaPago"
                                value="contado"
                                checked={data.formaPago === 'contado'}
                                onChange={(e) => handleFormaPagoChange(e.target.value as 'contado' | 'cuotas')}
                                className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Contado</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="formaPago"
                                value="cuotas"
                                checked={data.formaPago === 'cuotas'}
                                onChange={(e) => handleFormaPagoChange(e.target.value as 'contado' | 'cuotas')}
                                className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Cuotas</span>
                        </label>
                    </div>
                </div>

                {data.formaPago === 'cuotas' && (
                    <div className="space-y-4">
                        <div className="space-y-2 md:max-w-xs">
                            <label className="text-sm font-medium text-gray-700">
                                Número de Cuotas <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={data.numeroCuotas || 3}
                                onChange={(e) => handleNumeroCuotasChange(parseInt(e.target.value) || 3)}
                                min="2"
                                max="12"
                                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-700">Detalle de Cuotas</h4>
                                <span className="text-sm text-gray-500">
                                    Total: <span className="font-semibold text-gray-900">S/ {data.cuotas.reduce((sum, c) => sum + c.monto, 0).toFixed(2)}</span>
                                </span>
                            </div>
                            <div className="space-y-2 max-h-64 overflow-y-auto rounded-md border border-gray-200 p-3">
                                {data.cuotas.map((cuota, index) => (
                                    <div key={cuota.id} className="flex gap-2 items-center rounded-lg bg-gray-50 p-3">
                                        <div className="flex-shrink-0 w-20">
                                            <span className="text-sm font-medium text-gray-700">Cuota {index + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="date"
                                                value={cuota.fechaVencimiento}
                                                readOnly
                                                className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm"
                                            />
                                        </div>
                                        <div className="w-32">
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">S/</span>
                                                <input
                                                    type="number"
                                                    value={cuota.monto}
                                                    onChange={(e) => handleCuotaChange(index, parseFloat(e.target.value) || 0)}
                                                    className="flex h-9 w-full rounded-md border border-gray-200 bg-white pl-8 pr-3 py-1 text-sm focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                                    step="0.01"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface MatriculaModalProps {
    isOpen: boolean;
    onClose: () => void;
    registrarMatricula: (data: any) => Promise<void>;
    initialData?: MatriculaFormData;
    mode?: 'create' | 'edit';
    catalogos: MatriculaRegisterData
}
// ============= PÁGINA PRINCIPAL DEL FORMULARIO =============
export default function MatriculaModal({ isOpen, onClose, registrarMatricula, initialData, mode = 'create', catalogos }: MatriculaModalProps) {
    const { user, loading } = useAuth()
    const [formData, setFormData] = useState<MatriculaFormData>({
        alumno: {
            dni: '',
            nombre: '',
            apellido: '',
            telefono: '',
        },
        apoderado: {
            dni: '',
            nombre: '',
            apellido: '',
            telefono: '',
        },
        datosAcademicos: {
            idPeriodo: 0,
            idArea: 0,
            idCarrera: 0,
            idSede: 0,
        },
        informacionPago: {
            categoria: 0,
            monto: 0,
            formaPago: 'contado',
            cuotas: [],
        },
    });

    const handleBuscarDni = async (dni: string) => {
        console.log('Buscando DNI:', dni);

        setTimeout(() => {
            setFormData({
                ...formData,
                alumno: {
                    ...formData.alumno,
                    nombre: 'Juan',
                    apellido: 'Pérez García',
                    telefono: '987654321',
                },
            });
            alert('Alumno encontrado en el sistema');
        }, 1000);
    };

    const handleSubmit = async () => {
        console.log('Usuario que registra la matrícula:', user);
        const tieneApoderadoValido =
            formData.apoderado?.dni &&
            formData.apoderado.dni.trim() !== '';
        const alumno = {
            ...formData.alumno,
            tipoPersona: "ALUMNO",
            ...(tieneApoderadoValido && {
                apoderado: {
                    ...formData.apoderado,
                    tipoPersona: "APODERADO",
                }
            }),
        };
        const deuda = formData.informacionPago.formaPago == 'cuotas' ? formData.informacionPago.cuotas.map(
            ({ id, fechaVencimiento, ...resto }) => resto
        ) : [{
            descripcion: "DEUDA CONTADO",
            monto: formData.informacionPago.monto,
            idConcepto: 1,
        }];
        const data = {
            alumno: alumno,
            idEmpleado: user?.idUsuario,
            idPeriodo: formData.datosAcademicos.idPeriodo,
            idCategoria: formData.informacionPago.categoria,
            idCarrera: formData.datosAcademicos.idCarrera,
            idSede: formData.datosAcademicos.idSede,
            monto: formData.informacionPago.monto,
            idFormaPago: formData.informacionPago.formaPago === 'contado' ? 1 : 2,
            deuda: deuda,
        }
        await registrarMatricula(data);

        onClose();
    };

    const handleCancel = () => {
        if (confirm('¿Está seguro de cancelar? Se perderán los datos ingresados.')) {
            alert('Formulario cancelado');
        }
    };
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
            <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            {mode === 'create' ? 'Registrar Matrícula' : 'Editar Matrícula'}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Complete todos los campos requeridos
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
                    <div className="space-y-6">
                        <DatosAlumno
                            data={formData.alumno}
                            onChange={(alumno) => setFormData({ ...formData, alumno })}
                            onBuscarDni={handleBuscarDni}
                        />

                        <DatosApoderado
                            data={formData.apoderado}
                            onChange={(apoderado) => setFormData({ ...formData, apoderado })}
                        />

                        <DatosAcademicosForm
                            catalogos={catalogos}
                            data={formData.datosAcademicos}
                            onChange={(datosAcademicos) => setFormData({ ...formData, datosAcademicos })}
                        />

                        <InformacionPagoForm
                            data={formData.informacionPago}
                            onChange={(informacionPago) => setFormData({ ...formData, informacionPago })}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t px-6 py-4 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-gray-900 px-4 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        <Save className="h-4 w-4" />
                        {mode === 'create' ? 'Guardar Matrícula' : 'Actualizar Matrícula'}
                    </button>
                </div>
            </div>
        </>
    );
}