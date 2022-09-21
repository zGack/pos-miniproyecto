import { collection, getDocs, getFirestore } from "firebase/firestore/";
import { FirebaseApp } from "../firebase/config";

// funcion auxiliar que lee los productos de la DB
export const loadProducts = async (uid = "") => {
  const db = getFirestore(FirebaseApp);
  const docRef = collection(db, "productos");

  const docSnap = await getDocs(docRef);

  const products = [];

  docSnap.forEach((doc) => {
    products.push({ nombre: doc.id, ...doc.data() });
  });

  return products;
};
