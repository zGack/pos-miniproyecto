/* este componente se encarga del diseño grafico y la recoleccion y envio de los datos
del formulario, no maneja mayor logica, solo los recolecta, su antecesor se encarga de realizar
las verificaciones y la logica con los datos que provee este componente.
By: Angelo Lozano
Last moidification: 28/08/2022
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductosForm = (props) => {
  const initialValues = {
    nombre: "",
    precio: 0,
    cantidad: 0
  };

  const [values, setvalues] = useState(initialValues);
  const titles = ["agregar", "modificar", "eliminar"];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    // se hace uso del code para saber que accion ejecutar
    e.preventDefault();

    if (props.code === "1") {
      props.agregarDatos(values);
    } else if (props.code === "2") {
      props.crear_modificar_Datos(values);
    } else {
      props.eliminarDatos(values);
    }
  };
  //el elemento del precio no se renderiza cuando se va a eliminar

  return (
    <div className="container p-4">
      <div className="row">
        <form className="card card-body">
          <div className="card-header">
            <h1>
              <center> {titles[props.code - 1]} producto </center>
            </h1>
          </div>
          <div className="form-group input-group">
            <div className="input-group-text bg-light">
              <label>Nombre</label>
            </div>
            <input
              type="text"
              className="form-control input-lg"
              placeholder=" manzana"
              name="nombre"
              onChange={handleInputChange}
            />
          </div>

          {props.code < 3 && (
            <div className="form-group input-group">
              <div className="input-group-text bg-light">
                <label>Precio</label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="  800"
                name="precio"
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="form-group input-group">
            <div className="input-group-text bg-light">
              <label>Cantidad</label>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="  8"
              name="cantidad"
              onChange={handleInputChange}
            />
          </div>
          <Link to="/Home">
            <button
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              {titles[props.code - 1]}{" "}
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default ProductosForm;
