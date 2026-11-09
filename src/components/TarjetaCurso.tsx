import { ArrowRight, BookOpen, User } from "lucide-react";
import { Link } from "react-router-dom";
import type { Curso } from "../types/curso";

interface Props {
  curso: Curso;
}

export function TarjetaCurso({ curso }: Props) {
  const porcentaje =
    curso.cupo > 0
      ? Math.min(100, Math.max(0, (curso.inscritos / curso.cupo) * 100))
      : 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant/60 bg-white shadow-sm">
      <div className="h-1.5 bg-secondary" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-md bg-surface-container-low px-2.5 py-1 font-mono text-xs font-semibold text-primary">
            {curso.codigo}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <BookOpen size={15} />
            {curso.creditos} créditos
          </span>
        </div>

        <h2 className="mt-4 text-xl font-semibold">{curso.nombre}</h2>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
          {curso.descripcion || "Sin descripción"}
        </p>

        <p className="mt-5 flex items-center gap-2 text-sm text-on-surface-variant">
          <User size={17} className="shrink-0 text-secondary" />
          {curso.docente
            ? `${curso.docente.nombre} ${curso.docente.apellido}`
            : "Docente por asignar"}
        </p>

        <div className="mt-auto pt-6">
          <div className="mb-2 flex justify-between gap-2 text-xs text-on-surface-variant">
            <span>Cupos ocupados</span>
            <span className="font-semibold">
              {curso.inscritos} / {curso.cupo}
            </span>
          </div>

          <div
            role="progressbar"
            aria-label={`Ocupación de ${curso.nombre}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(porcentaje)}
            aria-valuetext={`${curso.inscritos} de ${curso.cupo} cupos ocupados`}
            className="h-2 overflow-hidden rounded-full bg-surface-container"
          >
            <div
              className={`h-full rounded-full ${
                curso.disponibles <= 0 ? "bg-outline" : "bg-secondary"
              }`}
              style={{ width: `${porcentaje}%` }}
            />
          </div>

          <p className="mt-2 text-xs font-medium text-on-surface-variant">
            {curso.disponibles <= 0
              ? "Sin cupos"
              : `${curso.disponibles} cupos disponibles`}
          </p>

          <Link
            to={`/cursos/${curso.id}`}
            className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-lg border border-secondary/30 px-4 py-2.5 text-sm font-semibold text-secondary transition hover:bg-secondary/5 focus-visible:outline-2 focus-visible:outline-secondary"
          >
            Ver curso
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
