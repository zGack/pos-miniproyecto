import { useEffect } from "react";
import { Link } from "react-router-dom";
import { VentaItem } from "../Componentes/VentaItem";
import { useAppStore } from "../hooks/useAppStore";

export const ReporteVentas = () => {
  const { startCargarVentas, ventas } = useAppStore();

  useEffect(() => {
    startCargarVentas();
  }, []);

  return (
    <div className="w-25 text-center mx-auto">
      <h3 className="mt-3">Reporte de Ventas</h3>
      <ol className="list-group list-group-numbered">
        {ventas.map((prod, index) => (
          <VentaItem key={index} {...prod} />
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
