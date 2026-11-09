import { useState } from "react";
import { BookOpen, ClipboardList, House, LogOut, Menu, X } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAuthStore } from "../store/useAuthStore";

const nombresRol = {
  ADMIN: "Administrador",
  ESTUDIANTE: "Estudiante",
  DOCENTE: "Docente",
};

export function LayoutApp() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const usuario = useAuthStore((state) => state.usuario);
  const cerrarSesion = useAuthStore((state) => state.cerrarSesion);
  const navigate = useNavigate();

  if (!usuario) return null;

  const enlaces = [
    { ruta: "/inicio", texto: "Inicio", icono: House },
    { ruta: "/cursos", texto: "Cursos", icono: BookOpen },
    ...(usuario.rol === "ESTUDIANTE"
      ? [
          {
            ruta: "/inscripciones",
            texto: "Mis inscripciones",
            icono: ClipboardList,
          },
        ]
      : []),
  ];

  function salir() {
    cerrarSesion();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen lg:flex">
      {menuAbierto && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMenuAbierto(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        id="menu-principal"
        aria-label="Menú principal"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-primary text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          menuAbierto ? "translate-x-0" : "hidden lg:flex"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-7">
          <Logo />
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuAbierto(false)}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-5">
          {enlaces.map(({ ruta, texto, icono: Icono }) => (
            <NavLink
              key={ruta}
              to={ruta}
              onClick={() => setMenuAbierto(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-secondary text-white"
                    : "text-on-primary-container hover:bg-white/10"
                }`
              }
            >
              <Icono size={20} />
              {texto}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={salir}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-on-primary-container hover:bg-white/10"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-outline-variant/50 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
              aria-controls="menu-principal"
              onClick={() => setMenuAbierto(true)}
              className="rounded-lg p-2 hover:bg-surface lg:hidden"
            >
              <Menu size={22} />
            </button>
            <span className="text-sm text-on-surface-variant">
              Campus virtual
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-secondary/10 font-semibold text-secondary sm:flex">
              {usuario.nombre.charAt(0)}
              {usuario.apellido.charAt(0)}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                {usuario.nombre} {usuario.apellido}
              </p>
              <p className="text-xs text-on-surface-variant">
                {nombresRol[usuario.rol]}
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
