import { Link } from "react-router-dom";
import { TarjetaEstadistica } from "../components/TarjetaEstadistica";
import { useApi } from "../hooks/useApi";
import { cursosService } from "../services/cursos";
import { usuariosService } from "../services/usuarios";

async function pedirResumen() {
  const [cursos, estudiantes] = await Promise.all([
    cursosService.getTotal(),
    usuariosService.getTotalEstudiantes(),
  ]);

  return { cursos, estudiantes };
}

export function InicioAdmin() {
  const { data, cargando, error, recargar } = useApi(pedirResumen);

  if (cargando) {
    return <p role="status">Cargando el resumen...</p>;
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

  if (!data) return null;

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <TarjetaEstadistica titulo="Total de cursos" valor={data.cursos} />
        <TarjetaEstadistica
          titulo="Total de estudiantes"
          valor={data.estudiantes}
        />
      </div>

      <section className="mt-8 rounded-2xl border border-outline-variant/60 bg-white p-7">
        <h2 className="text-xl font-semibold">Explora la oferta académica</h2>
        <p className="mt-2 text-on-surface-variant">
          Consulta los cursos, sus docentes y los cupos disponibles.
        </p>
        <Link
          to="/cursos"
          className="mt-5 inline-flex rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-white hover:bg-secondary/90"
        >
          Ver cursos
        </Link>
      </section>
    </>
  );
}
