import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { RegistroPage } from "./pages/RegistroPage";

export default function App() {
  const token = useAuthStore((state) => state.token);
  const usuario = useAuthStore((state) => state.usuario);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        <Route
          path="/inicio"
          element={
            token && usuario ? (
              <main className="p-8">
                <h1 className="text-2xl font-semibold">
                  Bienvenido, {usuario.nombre}
                </h1>
                <p className="mt-2">Tu sesión está iniciada correctamente.</p>
              </main>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
