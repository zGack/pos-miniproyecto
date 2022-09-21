export const VentaItem = ({ nombre: fecha, total }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="d-flex flex-column align-items-start ms-2 w-100">
        <div className="fw-bold">{fecha}</div>
        <div>Total venta: $ {total}</div>
        {/* <div>Cantidad disponible: {cantidad}</div> */}
      </div>
    </li>
  );
};
