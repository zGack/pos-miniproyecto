// Importamos los modulos que vamos a usar en la app
// el inicializador, firestore que es la db nosql,
// storage que es un gestor de imagenes
//y auth que es el modulo de autenticacion
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
import "firebase/auth";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApSnCuH5p2jGiGmqKMC8BnBTXvLg4khPk",
  authDomain: "app-pos-4c678.firebaseapp.com",
  projectId: "app-pos-4c678",
  storageBucket: "app-pos-4c678.appspot.com",
  messagingSenderId: "965350550972",
  appId: "1:965350550972:web:f21854cd1238dc4ff48fb9"
};

// exportaciones
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirestoreDB = getFirestore(FirebaseApp);
