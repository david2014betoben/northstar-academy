import { api } from "../lib/axios";
import type { RespuestaApi, RespuestaPaginada } from "../types/api";
import type { Curso } from "../types/curso";

export const cursosService = {
  getTodos: async (): Promise<Curso[]> => {
    const cursos: Curso[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const respuesta = await api.get<RespuestaPaginada<Curso>>("/cursos", {
        params: { page, limit: 100 },
      });

      cursos.push(...respuesta.data.data);
      totalPages = respuesta.data.meta.totalPages;
      page += 1;
    } while (page <= totalPages);

    return cursos;
  },

  getPorId: async (id: number): Promise<Curso> => {
    const respuesta = await api.get<RespuestaApi<Curso>>(`/cursos/${id}`);
    return respuesta.data.data;
  },

  getTotal: async (): Promise<number> => {
    const respuesta = await api.get<RespuestaPaginada<Curso>>("/cursos", {
      params: { limit: 1 },
    });

    return respuesta.data.meta.total;
  },
};
