import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { login, logout, updateRole } from "../store";
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle
} from "../firebase/providers";
import { FirebaseApp } from "../firebase/config";
import { updateUserRole } from "../helpers/updateUserRole";

// en este archivo se declaran los metodos y atributos que hay
// para el estado "auth"

export const useAuthStore = () => {
  // el dispatch se encargada de ejecutar las acciones del estado
  const dispatch = useDispatch();
  // atributos del estado auth
  const { user, status, errorMessage } = useSelector((state) => state.auth);

  const db = getFirestore(FirebaseApp);

  const startCreatingUserWithEmailPassword = async ({ email, password }) => {
    // se crea el usuario en Firebase
    const result = await registerUserWithEmailPassword({
      email,
      password
    });

    const { ok, ...login_user } = result;

    // si hubo un error, se cancela el proceso
    if (!ok) return dispatch(logout(result));

    // se guarda el rol del usuario y el email
    await setDoc(doc(db, "usuarios", login_user.uid), {
      email: login_user.email,
      rol: "vendedor"
    });

    dispatch(login(login_user));
  };

  const startLogInWithEmailPassword = async ({ email, password }) => {
    // se hace login del usuario
    const result = await loginWithEmailPassword({ email, password });

    const { ok, ...login_user } = result;

    // si hubo un error, se cancela el proceso
    if (!ok) return dispatch(logout(result));

    dispatch(login(login_user));
  };

  const startGoogleSignIn = async () => {
    const result = await signInWithGoogle();

    const { ok, ...login_user } = result;

    if (!ok) return dispatch(logout(result));

    dispatch(login(login_user));
  };

  const startLogout = async () => {
    //se hace logout del usuario
    await logoutFirebase();
    dispatch(logout());
  };

  const startSavingNewRoles = (users) => {
    users.forEach(async ({ uid, email, rol }) => {
      await updateUserRole(uid, rol);
      if (user.uid === uid && user.rol !== rol) {
        dispatch(updateRole(rol));
      }
    });
  };

  return {
    //Atributos
    user,
    status,
    errorMessage,

    //Metodos
    startCreatingUserWithEmailPassword,
    startLogInWithEmailPassword,
    startGoogleSignIn,
    startLogout,
    startSavingNewRoles
  };
};
