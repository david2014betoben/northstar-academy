import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { InicioAdmin } from "./InicioAdmin";
import { InicioEstudiante } from "./InicioEstudiante";

export function InicioPage() {
  const usuario = useAuthStore((state) => state.usuario);

  if (!usuario) return null;

  return (
    <>
      <header className="mb-7">
        <h1 className="text-3xl font-semibold tracking-tight">
          Hola, {usuario.nombre}
        </h1>
        <p className="mt-2 text-on-surface-variant">
          {usuario.rol === "ADMIN"
            ? "Consulta el resumen de tu academia."
            : "Continúa construyendo tu futuro."}
        </p>
      </header>

      {usuario.rol === "ADMIN" ? (
        <InicioAdmin />
      ) : usuario.rol === "ESTUDIANTE" ? (
        <InicioEstudiante />
      ) : (
        <Link to="/cursos" className="font-semibold text-secondary">
          Explorar cursos →
        </Link>
      )}
    </>
  );
}
