import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useAuthStore } from "../store/useAuthStore";

export function NoEncontradaPage() {
  const token = useAuthStore((state) => state.token);
  const usuario = useAuthStore((state) => state.usuario);
  const destino = token && usuario ? "/inicio" : "/login";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-center px-5 py-8">
        <Link to={destino} aria-label="NorthStar Academy - Inicio">
          <Logo />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="max-w-xl text-center">
          <svg
            aria-hidden="true"
            className="mx-auto mb-6 h-48 w-48"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#CBD5E1"
              strokeDasharray="3 5"
            />
            <circle
              cx="100"
              cy="100"
              r="64"
              stroke="#CBD5E1"
              strokeOpacity=".5"
            />
            <path
              d="M28 165C55 160 75 130 95 125C115 120 150 148 168 85"
              stroke="#0F857D"
              strokeWidth="2.5"
              strokeDasharray="5 6"
              strokeLinecap="round"
            />
            <circle cx="168" cy="85" r="4.5" fill="#0F857D" />
            <path
              d="M100 38L105 63L130 70L105 77L100 102L95 77L70 70L95 63Z"
              fill="#0F857D"
            />
            <circle cx="100" cy="70" r="3" fill="#FFFFFF" />
            <circle cx="28" cy="165" r="3.5" fill="#14243B" />
          </svg>

          <span className="rounded-full border border-outline-variant/50 bg-white px-3 py-1 text-xs font-semibold tracking-widest">
            ERROR 404
          </span>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Parece que nos salimos del camino
          </h1>

          <p className="mt-4 text-lg text-on-surface-variant">
            La página que buscas no existe o cambió de dirección.
          </p>

          <Link
            to={destino}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-white hover:bg-secondary/90"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
        </div>
      </main>

      <footer className="px-5 py-6 text-center text-xs text-on-surface-variant">
        © {new Date().getFullYear()} NorthStar Academy.
      </footer>
    </div>
  );
}
