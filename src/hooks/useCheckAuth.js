import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { loadUserRole } from "../helpers/loadUserRole";
import { login, logout } from "../store";
import { useAppStore } from "./useAppStore";
import { useAuthStore } from "./useAuthStore";

// esta funcion se carga de verificar si hay un usuario logeado en la app

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useAuthStore();
  const { startCargarProductos, startCargarVentas } = useAppStore();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) {
        dispatch(logout());
      } else {
        const { uid, email } = user;
        const rol = await loadUserRole(uid);

        await startCargarProductos();
        await startCargarVentas();

        dispatch(login({ uid, email, rol }));
      }
    });
  }, []);

  return {
    status
  };
};
