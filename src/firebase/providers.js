import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth
} from "firebase/auth";
import { loadUserRole } from "../helpers/loadUserRole";
import { FirebaseApp, FirebaseAuth } from "../firebase/config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { checkUserExist } from "../helpers/checkUserExist";

// en este archivo se encuentran las funciones que realizan el login
// y el registro de usuarios

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(FirebaseApp);
const db = getFirestore(FirebaseApp);

export const registerUserWithEmailPassword = async ({ email, password }) => {
  try {
    // se crea el usuario en Firebase
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid } = resp.user;

    // se comprueba si el proceso fue exitoso
    return {
      ok: true,
      uid,
      email,
      rol: "vendedor" // por defecto todos los usuarios son vendedores
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const { email, uid } = result.user;
    const rol = await loadUserRole(uid);

    const existUserRole = await checkUserExist(uid);

    if (!existUserRole) {
      // se guarda el rol del usuario y el email
      await setDoc(doc(db, "usuarios", uid), {
        email,
        rol
      });
    }

    return {
      ok: true,
      uid,
      email,
      rol
    };
  } catch (error) {
    const errorMessage = error.message;

    console.log("errors", error);

    return {
      ok: false,
      errorMessage
    };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    // se hace login del usuario en Firebase
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid } = resp.user;

    // se lee el rol del usuario
    const rol = await loadUserRole(uid);

    // se verifica si el proceso fue exitoso
    return {
      ok: true,
      uid,
      email,
      rol
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

export const logoutFirebase = async () => {
  // se hace logout del usuario
  return await FirebaseAuth.signOut();
};
