export const ItemCarrito = ({ nombre, cantidad, precio }) => {
  return (
    <li className="list-group-item d-flex justify-content-between lh-sm">
      <div className="d-flex flex-column align-items-start">
        <h6 className="my-0">
          {nombre} x {cantidad}
        </h6>
        <small className="text-muted">Precio unidad: ${precio}</small>
      </div>
      <span className="text-muted">${precio * cantidad}</span>
    </li>
  );
};
