import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditarRolesUser } from "../Componentes/EditarRolesUser";
import { loadUsers } from "../helpers/loadUsers";
import { useAuthStore } from "../hooks/useAuthStore";

export const EditarRoles = () => {
  const [usersRole, setUsersRole] = useState([]);
  const { startSavingNewRoles } = useAuthStore();
  const navigate = useNavigate();

  // se cargan la informacion de los usuarios de la DB
  useEffect(() => {
    loadUsers().then((user) => setUsersRole(user));
  }, []);

  // en esta funcion se actualiza el rol del usuario
  const handleRoleChange = (event, index) => {
    const newUsersRole = [...usersRole];
    newUsersRole[index].rol = event.value;
    setUsersRole(newUsersRole);
  };

  const handleSave = async () => {
    await startSavingNewRoles(usersRole);
    navigate("/Home");
  };

  return (
    <div className="d-flex flex-column align-content-center m-4 w-50 mx-auto">
      <h3 className="mb-3">Gestionar Roles</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Usuario</th>
            <th scope="col">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usersRole.map((user, index) => (
            <EditarRolesUser
              key={user.uid}
              handleRoleChange={(event) => handleRoleChange(event, index)}
              {...user}
            />
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <Link to="/Home">
          <button type="button" className="btn btn-secondary">
            volver
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-primary ms-2"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
