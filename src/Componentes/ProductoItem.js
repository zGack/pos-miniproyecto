export const ProductoItem = ({ nombre, precio, cantidad }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="d-flex flex-column align-items-start ms-2 w-100">
        <div className="fw-bold">{nombre}</div>
        <div>Precio unitario: $ {precio}</div>
        <div>Cantidad disponible: {cantidad}</div>
      </div>
      {cantidad <= 1 && <span className="badge bg-danger rounded-pill">!</span>}
    </li>
  );
};
