import { useState } from "react";
import { Buscador } from "../components/Buscador";
import { TarjetaCurso } from "../components/TarjetaCurso";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";

export function CursosPage() {
  const [busqueda, setBusqueda] = useState("");

  const {
    data: cursos,
    cargando,
    error,
    recargar,
  } = useApi(cursosService.getTodos);

  const consulta = busqueda.trim().toLowerCase();

  const cursosFiltrados = (cursos ?? []).filter(
    (curso) =>
      curso.nombre.toLowerCase().includes(consulta) ||
      curso.codigo.toLowerCase().includes(consulta),
  );

  return (
    <>
      <header className="mb-7">
        <h1 className="text-3xl font-semibold tracking-tight">
          Explora nuestros cursos
        </h1>
        <p className="mt-2 text-on-surface-variant">
          Encuentra tu próximo paso y consulta los cupos disponibles.
        </p>
      </header>

      <div className="mb-7">
        <Buscador valor={busqueda} onCambiar={setBusqueda} />
      </div>

      {cargando ? (
        <p role="status" className="text-on-surface-variant">
          Cargando cursos...
        </p>
      ) : error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-error">{error}</p>
          <button
            type="button"
            onClick={recargar}
            className="mt-3 rounded-lg bg-secondary px-4 py-2 font-medium text-white"
          >
            Reintentar
          </button>
        </div>
      ) : !cursos?.length ? (
        <p className="rounded-xl border border-outline-variant/60 bg-white p-8 text-center text-on-surface-variant">
          Aún no hay cursos disponibles.
        </p>
      ) : !cursosFiltrados.length ? (
        <p className="rounded-xl border border-outline-variant/60 bg-white p-8 text-center text-on-surface-variant">
          No encontramos cursos con ese nombre o código.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cursosFiltrados.map((curso) => (
            <TarjetaCurso key={curso.id} curso={curso} />
          ))}
        </div>
      )}
    </>
  );
}
