export interface RespuestaApi<T> {
  success: boolean;
  message?: string;
  data: T;
}
