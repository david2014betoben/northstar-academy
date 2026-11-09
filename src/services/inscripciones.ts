import { api } from "../lib/axios";
import type { RespuestaApi, RespuestaPaginada } from "../types/api";
import type { Inscripcion } from "../types/inscripcion";

export const inscripcionesService = {
  getTodas: async (): Promise<Inscripcion[]> => {
    const inscripciones: Inscripcion[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const respuesta = await api.get<RespuestaPaginada<Inscripcion>>(
        "/inscripciones",
        {
          params: { page, limit: 100 },
        },
      );

      inscripciones.push(...respuesta.data.data);
      totalPages = respuesta.data.meta.totalPages;
      page += 1;
    } while (page <= totalPages);

    return inscripciones;
  },

  crear: async (cursoId: number): Promise<Inscripcion> => {
    const respuesta = await api.post<RespuestaApi<Inscripcion>>(
      "/inscripciones",
      { cursoId },
    );

    return respuesta.data.data;
  },
};
