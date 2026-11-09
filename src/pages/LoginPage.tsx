import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle, LogIn, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutAuth } from "../components/LayoutAuth";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";
import { mensajeError } from "../lib/errores";

export function LoginPage() {
  const navigate = useNavigate();
  const iniciarSesion = useAuthStore((state) => state.iniciarSesion);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;

    setError("");
    setEnviando(true);

    try {
      const sesion = await authService.login({
        username: username.trim(),
        password,
      });

      iniciarSesion(sesion.token, sesion.usuario);
      navigate("/inicio", { replace: true });
    } catch (err) {
      setError(
        mensajeError(err, "No se pudo iniciar sesión. Inténtalo de nuevo."),
      );
    } finally {
      setEnviando(false);
    }
  }

  const claseInput =
    "min-h-12 w-full rounded-lg border border-outline-variant bg-white py-3 pl-11 pr-4 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:opacity-60";

  return (
    <LayoutAuth>
      <h2 className="text-3xl font-semibold tracking-tight">
        Bienvenido de nuevo
      </h2>
      <p className="mt-2 mb-7 text-on-surface-variant">
        Inicia sesión para continuar aprendiendo
      </p>

      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-error"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Usuario
          </label>
          <div className="relative">
            <User
              aria-hidden="true"
              size={19}
              className="absolute top-3.5 left-3.5 text-outline"
            />
            <input
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={enviando}
              required
              className={claseInput}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Contraseña
          </label>
          <div className="relative">
            <Lock
              aria-hidden="true"
              size={19}
              className="absolute top-3.5 left-3.5 text-outline"
            />
            <input
              id="password"
              name="password"
              autoComplete="current-password"
              type={mostrarPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={enviando}
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
        </div>

        {enviando && (
          <p role="status" className="text-sm text-on-surface-variant">
            El servidor puede tardar cerca de un minuto en responder al iniciar.
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 font-semibold text-white transition hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-60"
        >
          {enviando ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <LogIn size={20} />
          )}
          {enviando ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <p className="mt-8 border-t border-outline-variant/50 pt-6 text-center text-sm text-on-surface-variant">
        ¿Aún no tienes una cuenta?{" "}
        <Link
          to="/registro"
          className="font-semibold text-secondary hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </LayoutAuth>
  );
}
