import { useCallback } from "react";
import axios from "axios";
import { ArrowLeft, BookOpen, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { InscripcionCurso } from "../components/InscripcionCurso";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { useAuthStore } from "../store/useAuthStore";

export function CursoDetallePage() {
  const { id } = useParams();
  const cursoId = Number(id);
  const usuario = useAuthStore((state) => state.usuario);

  const pedirCurso = useCallback(async () => {
    if (!Number.isSafeInteger(cursoId) || cursoId <= 0) {
      return null;
    }

    try {
      return await cursosService.getPorId(cursoId);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }

      throw error;
    }
  }, [cursoId]);

  const { data: curso, cargando, error, recargar } = useApi(pedirCurso);

  const volver = (
    <Link
      to="/cursos"
      className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:underline"
    >
      <ArrowLeft size={18} />
      Volver a cursos
    </Link>
  );

  if (cargando && !curso) {
    return (
      <>
        {volver}
        <p role="status">Cargando curso...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        {volver}
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-error">{error}</p>
          <button
            type="button"
            onClick={recargar}
            disabled={cargando}
            className="mt-3 rounded-lg bg-secondary px-4 py-2 text-white disabled:opacity-60"
          >
            {cargando ? "Cargando..." : "Reintentar"}
          </button>
        </div>
      </>
    );
  }

  if (!curso) {
    return (
      <>
        {volver}
        <h1 className="text-2xl font-semibold">No encontramos este curso</h1>
      </>
    );
  }

  const porcentaje =
    curso.cupo > 0
      ? Math.min(100, Math.max(0, (curso.inscritos / curso.cupo) * 100))
      : 0;

  return (
    <>
      {volver}

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-2xl border border-outline-variant/60 bg-white p-6 sm:p-8">
          <span className="rounded-md bg-secondary/10 px-3 py-1 font-mono text-sm font-semibold text-secondary">
            {curso.codigo}
          </span>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight">
            {curso.nombre}
          </h1>

          <div className="mt-5 flex flex-wrap gap-5 text-sm text-on-surface-variant">
            <p className="flex items-center gap-2">
              <User size={18} className="text-secondary" />
              {curso.docente
                ? `${curso.docente.nombre} ${curso.docente.apellido}`
                : "Docente por asignar"}
            </p>

            <p className="flex items-center gap-2">
              <BookOpen size={18} className="text-secondary" />
              {curso.creditos} créditos
            </p>
          </div>

          <div className="mt-8 border-t border-outline-variant/50 pt-6">
            <h2 className="text-lg font-semibold">Acerca del curso</h2>
            <p className="mt-3 leading-relaxed whitespace-pre-wrap text-on-surface-variant">
              {curso.descripcion || "Sin descripción"}
            </p>
          </div>
        </section>

        <aside className="rounded-2xl border border-outline-variant/60 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Cupos disponibles</h2>

          <p className="mt-4 text-4xl font-semibold text-secondary">
            {curso.disponibles}
          </p>
          <p className="mt-1 text-sm text-on-surface-variant">
            de {curso.cupo} cupos totales
          </p>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-on-surface-variant">
              <span>Cupos ocupados</span>
              <span>
                {curso.inscritos} / {curso.cupo}
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Ocupación del curso"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(porcentaje)}
              className="h-2 overflow-hidden rounded-full bg-surface-container"
            >
              <div
                className="h-full rounded-full bg-secondary"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
          </div>

          {cargando && (
            <p role="status" className="mt-3 text-xs text-on-surface-variant">
              Actualizando cupos...
            </p>
          )}

          {usuario?.rol === "ESTUDIANTE" && (
            <InscripcionCurso
              key={curso.id}
              cursoId={curso.id}
              disponibles={curso.disponibles}
              actualizarCurso={recargar}
            />
          )}
        </aside>
      </div>
    </>
  );
}
