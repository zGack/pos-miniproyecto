import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "../Paginas";

export const AuthRoutes = () => {
  // este componente hace el redirecionamiento de
  // las rutas con login de la app cuando un
  // usuario no esta autenticado
  return (
    <Routes>
      <Route path="Signup" element={<Signup />} />

      <Route path="/*" element={<Login />} />
    </Routes>
  );
};
