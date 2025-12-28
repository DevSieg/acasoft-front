export interface DeudaDataDto{
    id:number,
    alumno:string,
    dni:string,
    periodo:string,
    monto:number,
    area:string,
    categoria:string,
    sede:string,
}
export interface DeudaParams {
    idSede?: number | null,
    search?: string | null,
    page?: number | null,
    limit?: number | null
}