import { Link } from "react-router-dom";
import { TarjetaEstadistica } from "../components/TarjetaEstadistica";
import { useApi } from "../hooks/useApi";
import { inscripcionesService } from "../services/inscripciones";

export function InicioEstudiante() {
  const {
    data: inscripciones,
    cargando,
    error,
    recargar,
  } = useApi(inscripcionesService.getTodas);

  const activas = (inscripciones ?? []).filter(
    (inscripcion) => inscripcion.estado === "ACTIVA",
  );

  const creditos = activas.reduce(
    (total, inscripcion) => total + inscripcion.curso.creditos,
    0,
  );

  if (cargando) {
    return <p role="status">Cargando tus inscripciones...</p>;
  }

  if (error) {
    return (
      <div role="alert" className="rounded-xl bg-red-50 p-5">
        <p className="text-error">{error}</p>
        <button
          type="button"
          onClick={recargar}
          className="mt-3 rounded-lg bg-secondary px-4 py-2 text-white"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <TarjetaEstadistica titulo="Cursos inscritos" valor={activas.length} />
        <TarjetaEstadistica titulo="Créditos inscritos" valor={creditos} />
      </div>

      <section className="mt-9">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Mis cursos activos</h2>
          <Link
            to="/inscripciones"
            className="text-sm font-semibold text-secondary hover:underline"
          >
            Ver mis inscripciones
          </Link>
        </div>

        {activas.length === 0 ? (
          <div className="rounded-2xl border border-outline-variant/60 bg-white p-7">
            <p className="text-on-surface-variant">
              Aún no tienes cursos activos.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {activas.map((inscripcion) => (
              <article
                key={inscripcion.id}
                className="rounded-2xl border border-outline-variant/60 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-on-surface-variant">
                    {inscripcion.curso.codigo}
                  </span>
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                    Activa
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {inscripcion.curso.nombre}
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  {inscripcion.curso.creditos} créditos
                </p>

                <Link
                  to={`/cursos/${inscripcion.curso.id}`}
                  className="mt-5 inline-block text-sm font-semibold text-secondary hover:underline"
                >
                  Ver curso →
                </Link>
              </article>
            ))}
          </div>
        )}

        <Link
          to="/cursos"
          className="mt-6 inline-flex rounded-lg border border-secondary/30 bg-white px-5 py-3 text-sm font-semibold text-secondary hover:bg-secondary/5"
        >
          Explorar cursos
        </Link>
      </section>
    </>
  );
}
