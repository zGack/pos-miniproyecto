import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore/";
import { FirebaseApp } from "../firebase/config";

// funcion auxiliar que actualiza los roles de los usuarios
// en la DB
export const updateUserRole = async (uid = "", newRole) => {
  const db = getFirestore(FirebaseApp);
  const docRef = doc(db, "usuarios", uid);
  const docSnap = await updateDoc(docRef, { rol: newRole });

  // const { rol } = docSnap.data();

  // return rol;
};
