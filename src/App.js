import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { AuthRoutes, AppRoutes } from "./Routers";

import { NotFound } from "./Paginas";

export const App = () => {
  // el "status" indica si hay un usuario autenticado
  const { status } = useCheckAuth();

  return (
    <div className="App">
      <Router>
        <Routes>
          {status === "authenticated" ? (
            <Route path="/*" element={<AppRoutes />} />
          ) : (
            <Route path="/*" element={<AuthRoutes />} />
          )}
          {/* 
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Productos" element={<Productos />} />
          <Route exact path="/Ventas" element={<Ventas />} />
          <Route exact path="/Permisos" element={<Permisos />} />
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );

  // function App() {
  //   return (
  //     <div className="App">
  //       <Alert type="error" message="Error" />
  //       <Alert type="success">
  //         <p>Success message</p>
  //       </Alert>

  //     </div>
  //   );
  // }
};
