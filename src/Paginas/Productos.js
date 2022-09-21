import { FirebaseApp as app } from "../firebase/config";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
/* Esta pagina sera la encargada de realizar el CRUD de los productos, para esto
va a recibir por medio de la url un valor del 1 al 3:
1.) agregar producto
2.) modificar producto
3.) eliminar producto
este valor sera asignado cuando el usuario hace click en el boton en home
La pagina tendra un componente para la interaccion con firestore, y otro para
la recoleccion de la informacion, ProductosComp y ProductosForm respectivamente.
By: Angelo Lozano
Last moidification: 28/08/2022
*/

import { Container, Button, Form } from "react-bootstrap";
import ProductosC from "../Componentes/ProductosComp";
import { useLocation } from "react-router-dom";
const db = getFirestore(app);
export const Productos = () => {
  // se leen los parametros recibidos desde home, para saber que accion se va a ejecutar
  // se renderiza el componente productosComp con la ref de la db y el code
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  return (
    <div className="container p-4">
      <div className="row">
        <Link to="/Home">
          <button>Go home</button>
        </Link>
        <ProductosC db={db} code={code} />
      </div>
    </div>
  );
};
