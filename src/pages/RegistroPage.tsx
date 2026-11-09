import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutAuth } from "../components/LayoutAuth";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";
import { mensajeError } from "../lib/errores";

export function RegistroPage() {
  const navigate = useNavigate();
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    setError("");

    if (!nombre.trim() || !apellido.trim()) {
      setError("Completa tu nombre y apellido.");
      return;
    }

    if (password !== confirmacion) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setEnviando(true);

    try {
      const sesion = await authService.registrar({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        username: username.trim(),
        password,
        ...(email.trim() ? { email: email.trim() } : {}),
      });

      iniciarSesion(sesion.token, sesion.usuario);
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(
        mensajeError(err, "No se pudo crear la cuenta. Inténtalo de nuevo."),
      );
    } finally {
      setEnviando(false);
    }
  }

  const claseInput =
    "min-h-12 w-full rounded-lg border border-outline-variant bg-white px-3 py-3 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20";

  const claseEtiqueta = "mb-2 block text-sm font-medium";

  return (
    <LayoutAuth>
      <h2 className="text-3xl font-semibold tracking-tight">
        Comienza tu camino
      </h2>
      <p className="mt-2 mb-7 text-on-surface-variant">
        Crea tu cuenta de estudiante
      </p>

      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-error"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset disabled={enviando} className="space-y-4 disabled:opacity-70">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nombre" className={claseEtiqueta}>
                Nombre
              </label>
              <input
                id="nombre"
                autoComplete="given-name"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                maxLength={100}
                required
                className={claseInput}
              />
            </div>

            <div>
              <label htmlFor="apellido" className={claseEtiqueta}>
                Apellido
              </label>
              <input
                id="apellido"
                autoComplete="family-name"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                maxLength={100}
                required
                className={claseInput}
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className={claseEtiqueta}>
              Nombre de usuario
            </label>
            <input
              id="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              minLength={3}
              maxLength={50}
              pattern="[a-zA-Z0-9._\-]+"
              title="Usa letras sin acentos, números, puntos, guiones o guiones bajos."
              aria-describedby="ayuda-usuario"
              required
              className={claseInput}
            />
            <p
              id="ayuda-usuario"
              className="mt-1 text-xs text-on-surface-variant"
            >
              De 3 a 50 caracteres: letras sin acentos, números, puntos y
              guiones.
            </p>
          </div>

          <div>
            <label htmlFor="email" className={claseEtiqueta}>
              Correo electrónico <span className="font-normal">(opcional)</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={150}
              className={claseInput}
            />
          </div>

          <div>
            <label htmlFor="password" className={claseEtiqueta}>
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={mostrarPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                maxLength={72}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,72}"
                title="Usa entre 8 y 72 caracteres, con mayúscula, minúscula y número."
                aria-describedby="ayuda-password"
                required
                className={`${claseInput} pr-12`}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword((actual) => !actual)}
                aria-label={
                  mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                aria-pressed={mostrarPassword}
                className="absolute inset-y-0 right-0 rounded-r-lg px-3 text-outline focus-visible:outline-2 focus-visible:outline-secondary"
              >
                {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p
              id="ayuda-password"
              className="mt-1 text-xs text-on-surface-variant"
            >
              Entre 8 y 72 caracteres, con mayúscula, minúscula y número.
            </p>
          </div>

          <div>
            <label htmlFor="confirmacion" className={claseEtiqueta}>
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="confirmacion"
                type={mostrarConfirmacion ? "text" : "password"}
                autoComplete="new-password"
                value={confirmacion}
                onChange={(event) => setConfirmacion(event.target.value)}
                maxLength={72}
                required
                className={`${claseInput} pr-12`}
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmacion((actual) => !actual)}
                aria-label={
                  mostrarConfirmacion
                    ? "Ocultar confirmación"
                    : "Mostrar confirmación"
                }
                aria-pressed={mostrarConfirmacion}
                className="absolute inset-y-0 right-0 rounded-r-lg px-3 text-outline focus-visible:outline-2 focus-visible:outline-secondary"
              >
                {mostrarConfirmacion ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {enviando && (
            <p role="status" className="text-sm text-on-surface-variant">
              El servidor puede tardar cerca de un minuto en responder al
              iniciar.
            </p>
          )}

          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 font-semibold text-white hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {enviando && <LoaderCircle size={20} className="animate-spin" />}
            {enviando ? "Creando cuenta..." : "Crear mi cuenta"}
          </button>
        </fieldset>
      </form>

      <p className="mt-8 border-t border-outline-variant/50 pt-6 text-center text-sm text-on-surface-variant">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="font-semibold text-secondary hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </LayoutAuth>
  );
}
