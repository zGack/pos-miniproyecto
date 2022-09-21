import Select from "react-select";

export const EditarRolesUser = ({ handleRoleChange, uid, email, rol }) => {
  const roles = [
    { value: "administrador", label: "administrador" },
    { value: "vendedor", label: "vendedor" }
  ];
  const rol_id = rol === roles[0].value ? 0 : 1;

  return (
    <tr>
      <td>{email}</td>
      <td>
        <Select
          value={roles.value}
          options={roles}
          defaultValue={roles[rol_id]}
          onChange={handleRoleChange}
        />
      </td>
    </tr>
  );
};
