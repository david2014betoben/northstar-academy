export interface RespuestaApi<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RespuestaPaginada<T> extends RespuestaApi<T[]> {
  meta: Meta;
}
