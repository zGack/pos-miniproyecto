import { Container, Form, Button } from "react-bootstrap";
import { useAuthStore } from "../hooks/useAuthStore";
import { UserForm } from "../hooks/useForm";

// estructura del input del registro de usuario
const formData = {
  email: "",
  password: "",
  confirmarPassword: ""
};

export const Signup = () => {
  // email -> hace referencia al input del email
  // password -> hace referencia al input del password
  // formState -> contiene la informacion que se ha ingresado en los inputs
  // onInputChange -> es la funcion con la cual se actualiza el valor del input correspondiente
  const {
    formState,
    onInputChange,
    email,
    password,
    confirmarPassword
  } = UserForm(formData);

  const { startCreatingUserWithEmailPassword, errorMessage } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    startCreatingUserWithEmailPassword(formState);
    // console.log("user creado");
  };

  return (
    <Container className="p-5">
      <div
        className={`alert alert-danger ${!!errorMessage ? "" : "d-none"}`}
        role="alert"
      >
        {errorMessage}
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirmar password"
            name="confirmarPassword"
            value={confirmarPassword}
            onChange={onInputChange}
          />{" "}
        </Form.Group>
        <a className="link-primary m-3" href="/">
          Log In
        </a>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};
