import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ItemCarrito } from "../Componentes/ItemCarrito";
import { getDataTime } from "../helpers/getDataTime";
import { useAppStore } from "../hooks/useAppStore";

const initProd = {
  nombre: "",
  cantidad: 0,
  precio: 0
};

export const Ventas = () => {
  const { productos } = useAppStore();
  const [producto, setProducto] = useState(initProd);
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const { startAgregarVenta } = useAppStore();

  const listProd = productos.map((prod, index) => {
    return { value: index, label: prod.nombre };
  });

  const handleSelectProduct = (event) => {
    setProducto(productos[event.value]);
    setCantidad(1);
    setPrecio(productos[event.value].precio);
    setMessage("");
  };

  const handleCantidadChange = (event) => {
    const newCantidad = event.target.value;
    console.log(newCantidad, producto.cantidad);

    if (newCantidad < 1 || newCantidad > producto.cantidad) return;
    setCantidad(newCantidad);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleAgregarProducto = (event) => {
    event.preventDefault();

    const newCarrito = [...carrito];
    newCarrito.push({ nombre: producto.nombre, precio, cantidad });
    setCarrito(newCarrito);
    setTotal(total + precio * cantidad);

    setProducto(initProd);
    setCantidad(1);
    setPrecio("");
  };

  const handleRegistrarCompra = async () => {
    if (carrito.length < 1) return;

    const currentDataTime = getDataTime();
    await startAgregarVenta(total, carrito, currentDataTime);
    setMessage("Venta Registrada");
    setTotal(0);
    setCarrito([]);
  };

  return (
    <div className="container mt-3" style={{ width: 960 }}>
      <div className="row g-5">
        <div className="col-md-6 col-lg-5 order-md-last">
          <div
            className={`alert alert-success ${!!message ? "" : "d-none"}`}
            role="alert"
          >
            {message}
          </div>
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Esta compra</span>
            <span className="badge bg-primary rounded-pill">
              {carrito.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {carrito.map((item, index) => (
              <ItemCarrito key={index} {...item} />
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>${total}</strong>
            </li>
          </ul>
          <div className="d-flex justify-content-end">
            <Link to="/Home">
              <button type="button" className="btn btn-secondary">
                volver
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={handleRegistrarCompra}
            >
              Registrar Compra
            </button>
          </div>
        </div>
        <div className="col-md-6 col-lg-7">
          <h4 className="mb-3">Ventas</h4>

          <form>
            <div className="row g-3">
              <div className="col-sm-6 d-flex flex-column align-items-start">
                <label className="form-label">Producto</label>
                <Select
                  options={listProd}
                  onChange={handleSelectProduct}
                  className="w-100"
                ></Select>
              </div>
              <div className="col-sm-3 d-flex flex-column align-items-start">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  className="form-control mx-auto"
                  value={cantidad}
                  onChange={handleCantidadChange}
                  required
                />
              </div>
              <div className="col-sm-3 d-flex flex-column align-items-start">
                <label className="form-label">Precio</label>
                <div className="input-group mb-3 ">
                  <span className="input-group-text">$</span>
                  <input
                    type="text"
                    name="precio"
                    className="form-control"
                    value={precio}
                    onChange={handlePrecioChange}
                    required
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleAgregarProducto}
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
