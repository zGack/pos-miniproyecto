import { useAuthStore } from "../hooks/useAuthStore";
import { UserForm } from "../hooks/useForm";

const formData = {
  email: "",
  password: ""
};

export const Login = () => {
  // email -> hace referencia al input del email
  // password -> hace referencia al input del password
  // formState -> contiene la informacion que se ha ingresado en los inputs
  // onInputChange -> es la funcion con la cual se actualiza el valor del input correspondiente
  const { formState, onInputChange, email, password } = UserForm(formData);

  const {
    startLogInWithEmailPassword,
    startGoogleSignIn,
    errorMessage
  } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    startLogInWithEmailPassword(formState);
  };

  const handleGoogleSignin = async () => {
    await startGoogleSignIn();
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div
            className={`alert alert-danger ${!!errorMessage ? "" : "d-none"}`}
            role="alert"
          >
            {errorMessage}
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </div>
          <div className="d-flex flex-column mt-3 text-center">
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary w-100 me-2"
                onClick={handleSubmit}
              >
                Log In
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleGoogleSignin}
              >
                Google
              </button>
            </div>
            <a className="link-primary m-3" href="/Signup">
              Sign up
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
