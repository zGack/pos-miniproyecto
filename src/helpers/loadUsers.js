import { collection, getDocs, getFirestore } from "firebase/firestore/";
import { FirebaseApp } from "../firebase/config";

// funcion auxiliar que lee los usuarios de la DB
export const loadUsers = async (uid = "") => {
  const db = getFirestore(FirebaseApp);
  const docRef = collection(db, "usuarios");

  const docSnap = await getDocs(docRef);

  const users = [];

  docSnap.forEach((doc) => {
    users.push({ uid: doc.id, ...doc.data() });
  });

  return users;
};
