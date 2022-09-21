import { collection, getDocs, getFirestore } from "firebase/firestore/";
import { FirebaseApp } from "../firebase/config";

// funcion auxiliar que lee los productos de la DB
export const loadVentas = async () => {
  const db = getFirestore(FirebaseApp);
  const docRef = collection(db, "ventas");

  const docSnap = await getDocs(docRef);

  const ventas = [];

  docSnap.forEach((doc) => {
    ventas.push({ nombre: doc.id, ...doc.data() });
  });

  return ventas;
};
