// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Configuración de Firebase de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyBatfPlCBFPShZJ2fdwHPQvY7AQH9Yug4Y",
  authDomain: "smartlist-88882.firebaseapp.com",
  projectId: "smartlist-88882",
  storageBucket: "smartlist-88882.appspot.com",
  messagingSenderId: "708569084885",
  appId: "1:708569084885:web:6d6126440e2fb80b3ac35c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la autenticación y Firestore para usarlos en otros componentes
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Exporta Firestore
