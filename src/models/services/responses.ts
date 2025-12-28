export type ApiOk<T> = { ok: true; data: T };
export type ApiFail =
    | { ok: false; mensaje: string }
    | { ok: false; errores: unknown };

export type ApiResult<T> = ApiOk<T> | ApiFail;