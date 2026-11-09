import { api } from "../lib/axios";
import type { RespuestaApi } from "../types/api";
import type { Usuario } from "../types/usuario";

interface LoginDatos {
  username: string;
  password: string;
}

interface RegistroDatos {
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email?: string;
}

interface Sesion {
  token: string;
  tipo: string;
  usuario: Usuario;
}

export const authService = {
  login: async (datos: LoginDatos): Promise<Sesion> => {
    const respuesta = await api.post<RespuestaApi<Sesion>>(
      "/auth/login",
      datos,
    );

    return respuesta.data.data;
  },

  registrar: async (datos: RegistroDatos): Promise<Sesion> => {
    const respuesta = await api.post<RespuestaApi<Sesion>>(
      "/auth/register",
      datos,
    );

    return respuesta.data.data;
  },
};
