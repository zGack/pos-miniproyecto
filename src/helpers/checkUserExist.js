import { doc, getDoc, getFirestore } from "firebase/firestore/";
import { FirebaseApp } from "../firebase/config";

// funcion auxiliar que lee de la DB el rol del usuario
export const checkUserExist = async (uid = "") => {
  const db = getFirestore(FirebaseApp);

  const docRef = doc(db, "usuarios", uid);
  const docSnap = await getDoc(docRef);
  let exist = false;

  if (docSnap.exists()) {
    exist = true;
  }

  return exist;
};
