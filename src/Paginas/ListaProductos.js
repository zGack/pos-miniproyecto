import { Link } from "react-router-dom";
import { ProductoItem } from "../Componentes/ProductoItem";
import { useAppStore } from "../hooks/useAppStore";

export const ListaProductos = () => {
  const { productos } = useAppStore();
  console.log(productos[0]);

  return (
    <div className="w-25 text-center mx-auto">
      <h3 className="mt-3">Listado de productos</h3>
      <ol className="list-group list-group-numbered">
        {productos.map((prod, index) => (
          <ProductoItem key={index} {...prod} />
        ))}
      </ol>
      <div className="d-flex justify-content-end mt-2">
        <Link to="/Home">
          <button type="button" className="btn btn-secondary">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
};
