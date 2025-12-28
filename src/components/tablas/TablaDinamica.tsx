'use client'
import { useState } from "react";
interface TablaDinamicaProps<T> {
    data: T[];
    columnasOcultas?: (keyof T)[];
    busquedaPor?: (keyof T)[];
    columnasPersonalizadas?: {
        [clave: string]: (valor: any, fila: T) => React.ReactNode;
    };
}

export function TablaDinamica<T extends Record<string, any>>({
    data,
    columnasOcultas = [],
    busquedaPor = [],
    columnasPersonalizadas = {},
}: TablaDinamicaProps<T>) {
    const [busqueda, setBusqueda] = useState("");

    const filtrado = data.filter((item) => {
        return busquedaPor.some((clave) =>
            String(item[clave]).toLowerCase().includes(busqueda.toLowerCase())
        );
    });

    const columnas = Object.keys(data[0] || {}).filter(
        (col) => !columnasOcultas.includes(col as keyof T)
    );

    return (
        <div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded shadow"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-gray-200">
                        <tr>
                            {columnas.map((col) => (
                                <th key={col} className="px-4 py-2 text-left capitalize">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtrado.map((item, idx) => (
                            <tr key={idx} className="border-t hover:bg-gray-50">
                                {columnas.map((col) => (
                                    <td key={col} className="px-4 py-2">
                                        {columnasPersonalizadas?.[col]
                                            ? columnasPersonalizadas[col](item[col], item)
                                            : String(item[col])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}