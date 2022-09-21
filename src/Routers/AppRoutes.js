import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import {
  Home,
  Productos,
  Ventas,
  Permisos,
  EditarRoles,
  ListaProductos,
  ReporteVentas
} from "../Paginas";

export const AppRoutes = () => {
  const { user } = useAuthStore();
  // este componente hace el redirecionamiento de
  // las rutas con la paginas de la app cuando un
  // usuario esta autenticado
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="Home" element={<Home />} />
      <Route path="Ventas" element={<Ventas />} />
      <Route path="Permisos" element={<Permisos />} />
      <Route path="ListaProductos" element={<ListaProductos />} />

      {user.rol === "administrador" && (
        <>
          <Route path="EditarRoles" element={<EditarRoles />} />
          <Route path="Productos" element={<Productos />} />
          <Route path="ReporteVentas" element={<ReporteVentas />} />
        </>
      )}

      <Route path="/*" element={<Navigate to="/Home" />} />
    </Routes>
  );
};
