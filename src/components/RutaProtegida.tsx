import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { Rol } from "../types/usuario";

interface Props {
  roles?: Rol[];
}

export function RutaProtegida({ roles }: Props) {
  const token = useAuthStore((state) => state.token);
  const usuario = useAuthStore((state) => state.usuario);

  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/inicio" replace />;
  }

  return <Outlet />;
}
