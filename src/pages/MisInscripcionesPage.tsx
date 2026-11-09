import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { inscripcionesService } from "../services/inscripciones";

const estados = {
  ACTIVA: {
    texto: "Activa",
    clase: "bg-secondary/10 text-secondary",
  },
  RETIRADA: {
    texto: "Retirada",
    clase: "bg-slate-100 text-slate-600",
  },
  FINALIZADA: {
    texto: "Finalizada",
    clase: "bg-blue-50 text-blue-700",
  },
};

export function MisInscripcionesPage() {
  const {
    data: inscripciones,
    cargando,
    error,
    recargar,
  } = useApi(inscripcionesService.getTodas);

  return (
    <>
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Mis inscripciones
          </h1>
          <p className="mt-2 text-on-surface-variant">
            Consulta los cursos en los que te has inscrito.
          </p>
        </div>

        <Link
          to="/cursos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
        >
          Explorar cursos
          <ArrowRight size={17} />
        </Link>
      </header>

      {cargando ? (
        <p role="status" className="text-on-surface-variant">
          Cargando tus inscripciones...
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
      ) : !inscripciones?.length ? (
        <div className="rounded-2xl border border-outline-variant/60 bg-white p-8 text-center">
          <BookOpen
            aria-hidden="true"
            size={36}
            className="mx-auto mb-4 text-secondary"
          />
          <h2 className="text-xl font-semibold">Aún no tienes inscripciones</h2>
          <p className="mt-2 text-on-surface-variant">
            Explora los cursos disponibles y elige tu próximo paso.
          </p>
          <Link
            to="/cursos"
            className="mt-5 inline-flex rounded-lg bg-secondary px-5 py-3 font-semibold text-white hover:bg-secondary/90"
          >
            Explorar cursos
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {inscripciones.map((inscripcion) => {
            const estado = estados[inscripcion.estado];

            return (
              <article
                key={inscripcion.id}
                className="rounded-2xl border border-outline-variant/60 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold text-on-surface-variant">
                    {inscripcion.curso.codigo}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${estado.clase}`}
                  >
                    {estado.texto}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold">
                  {inscripcion.curso.nombre}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-sm text-on-surface-variant">
                  <BookOpen size={17} className="text-secondary" />
                  {inscripcion.curso.creditos} créditos
                </p>

                <Link
                  to={`/cursos/${inscripcion.curso.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                >
                  Ver curso
                  <ArrowRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
