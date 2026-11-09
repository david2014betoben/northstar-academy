import axios from "axios";

export function mensajeError(
  error: unknown,
  alternativa = "Ocurrió un error. Inténtalo de nuevo.",
): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? alternativa;
  }

  return alternativa;
}
