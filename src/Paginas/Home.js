/* Home es la pagina principal, la cual sirve para direccionar al usuario
a diferentes paginas, por medio del path se puede mandar informacion en caso de ser necesario
*/
import { Link } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

export const Home = () => {
  const { user, startLogout } = useAuthStore();
  const rolAdmin = "administrador";

  const handleLogout = () => {
    startLogout();
  };

  return (
    <div className="text-center">
      <div className="d-flex justify-content-between m-2">
        <h3>Home - {user.rol}</h3>
        <h3>{user.email}</h3>
      </div>
      <div className="d-flex flex-column align-items-center">
        <Link to="/Ventas">
          <div className="p-2 flex-fill">
            <button type="submit" className="btn btn-primary">
              Ventas
            </button>
          </div>
        </Link>
        <Link to="/ListaProductos">
          <div className="p-2 flex-fill">
            <button type="submit" className="btn btn-primary">
              Productos
            </button>
          </div>
        </Link>
        {/* aqui se comprueba si el usuario loggeado es admin */}
        {user.rol === rolAdmin && (
          <>
            <Link to="/ReporteVentas">
              <div className="p-2 flex-fill">
                <button type="submit" className="btn btn-primary">
                  Reporte de ventas
                </button>
              </div>
            </Link>
            <Link to="/Productos?code=1">
              <div className="p-2 flex-fill">
                <button type="submit" className="btn btn-primary">
                  Agregar Producto
                </button>
              </div>
            </Link>
            <Link to="/Productos?code=2">
              <div className="p-2 flex-fill">
                <button type="submit" className="btn btn-primary">
                  Modificar Producto
                </button>
              </div>
            </Link>
            <Link to="/Productos?code=3">
              <div className="p-2 flex-fill">
                <button type="submit" className="btn btn-primary">
                  Eliminar Producto
                </button>
              </div>
            </Link>
            <Link to="/EditarRoles">
              <div className="p-2 flex-fill">
                <button type="button" className="btn btn-primary">
                  Editar Roles
                </button>
              </div>
            </Link>
          </>
        )}
        <div className="p-2 flex-fill">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
