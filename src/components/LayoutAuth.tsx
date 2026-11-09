import type { ReactNode } from "react";
import { Logo } from "./Logo";

interface Props {
  children: ReactNode;
}

export function LayoutAuth({ children }: Props) {
  return (
    <main className="flex min-h-screen">
      <section className="constellation-grid relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary p-12 text-white lg:flex xl:p-16">
        <Logo />

        <div className="relative my-12 max-w-lg">
          <svg
            aria-hidden="true"
            className="mb-8 h-48 w-48"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M20 180C60 140 100 160 140 100C160 70 150 40 100 30"
              stroke="#0F857D"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M10 120C50 80 90 120 100 30"
              stroke="#E2E8F0"
              strokeOpacity=".3"
            />
            <circle cx="100" cy="30" r="28" stroke="#0F857D" />
            <circle cx="20" cy="180" r="4" fill="#0F857D" />
            <circle cx="140" cy="100" r="4" fill="#0F857D" />
            <path
              d="M100 8L104 24L120 30L104 36L100 52L96 36L80 30L96 24Z"
              fill="#90F0E6"
            />
          </svg>

          <h1 className="text-4xl leading-tight font-semibold">
            Guiamos tu aprendizaje, impulsamos tu futuro
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-on-primary-container">
            Un espacio para aprender, desarrollar tus habilidades y avanzar
            hacia nuevas oportunidades.
          </p>
        </div>

        <p className="border-t border-white/10 pt-6 text-sm text-on-primary-container">
          NorthStar Academy · Aprende y construye tu futuro
        </p>
      </section>

      <section className="flex w-full flex-col items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2">
        <div className="mb-8 w-full max-w-md text-primary lg:hidden">
          <Logo />
        </div>

        <div className="w-full max-w-md rounded-2xl border border-outline-variant/50 bg-white p-6 shadow-sm sm:p-10">
          {children}
        </div>
      </section>
    </main>
  );
}
