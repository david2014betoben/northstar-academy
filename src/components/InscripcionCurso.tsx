import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { inscripcionesService } from "../services/inscripciones";
import { mensajeError } from "../lib/errores";

interface Props {
  cursoId: number;
  disponibles: number;
  actualizarCurso: () => void;
}

export function InscripcionCurso({
  cursoId,
  disponibles,
  actualizarCurso,
}: Props) {
  const {
    data: inscripciones,
    cargando,
    error,
    recargar,
  } = useApi(inscripcionesService.getTodas);

  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [inscripcionCreada, setInscripcionCreada] = useState(false);

  const inscrito =
    inscripcionCreada ||
    inscripciones?.some(
      (inscripcion) =>
        inscripcion.curso.id === cursoId && inscripcion.estado === "ACTIVA",
    );

  async function inscribirme() {
    if (enviando || inscrito || disponibles <= 0) return;

    setEnviando(true);
    setErrorEnvio("");

    try {
      await inscripcionesService.crear(cursoId);
      setInscripcionCreada(true);
      actualizarCurso();
    } catch (err) {
      setErrorEnvio(mensajeError(err, "No se pudo realizar la inscripción."));
      recargar();
      actualizarCurso();
    } finally {
      setEnviando(false);
    }
  }

  if (cargando) {
    return (
      <p role="status" className="mt-5 text-sm text-on-surface-variant">
        Consultando inscripción...
      </p>
    );
  }

  if (error) {
    return (
      <div role="alert" className="mt-5 text-sm">
        <p className="text-error">{error}</p>
        <button
          type="button"
          onClick={recargar}
          className="mt-2 font-semibold text-secondary underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={inscribirme}
        disabled={enviando || inscrito || disponibles <= 0}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 font-semibold text-white hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : inscrito ? (
          <Check size={20} />
        ) : null}

        {enviando
          ? "Inscribiendo..."
          : inscrito
            ? "Inscrito"
            : disponibles <= 0
              ? "Sin cupos"
              : "Inscribirme"}
      </button>

      {inscripcionCreada && (
        <p role="status" className="mt-3 text-sm text-secondary">
          Tu inscripción se realizó correctamente.
        </p>
      )}

      {errorEnvio && (
        <p role="alert" className="mt-3 text-sm text-error">
          {errorEnvio}
        </p>
      )}
    </div>
  );
}
