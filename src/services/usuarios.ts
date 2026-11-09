import { api } from "../lib/axios";
import type { RespuestaPaginada } from "../types/api";
import type { Usuario } from "../types/usuario";

export const usuariosService = {
  getTotalEstudiantes: async (): Promise<number> => {
    const respuesta = await api.get<RespuestaPaginada<Usuario>>("/usuarios", {
      params: { rol: "ESTUDIANTE", limit: 1 },
    });

    return respuesta.data.meta.total;
  },
};
