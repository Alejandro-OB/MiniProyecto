// src/services/firestoreService.js
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore"; 
import { doc, setDoc } from "firebase/firestore";

// Función para crear una lista de compras
export const crearListaCompras = async () => {
  try {
    const docRef = await addDoc(collection(db, "listacompras"), {
      FechaRegistro: new Date()
    });
    console.log("Lista de compras creada con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear la lista de compras: ", e);
  }
};

// Función para agregar un elemento a una lista de compras
export const agregarElementoALista = async (nombre, idSitio, idLista) => {
  try {
    const docRef = await addDoc(collection(db, "elementoslista"), {
      Nombre: nombre,
      IdSitio: idSitio,
      IdLista: idLista
    });
    console.log("Elemento agregado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al agregar elemento: ", e);
  }
};

// Función para crear un sitio
export const crearSitio = async (nombre) => {
  try {
    const docRef = await addDoc(collection(db, "sitios"), {
      Nombre: nombre,
      FechaRegistro: new Date()
    });
    console.log("Sitio creado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear sitio: ", e);
  }
};

// Función para registrar un nuevo usuario en Firestore con ID específico
export const crearUsuario = async (userId, usuario) => {
    try {
      await setDoc(doc(db, "usuarios", userId), {
        Nombres: usuario.nombres,
        Apellidos: usuario.apellidos,
        TipoDocumento: usuario.tipoDocumento,
        NumeroDocumento: usuario.numeroDocumento,
        Genero: usuario.genero,
        CorreoElectronico: usuario.correo,
        Telefono: usuario.telefono,
        Rol: usuario.rol,
        FechaNacimiento: usuario.fechaNacimiento,
        Foto: usuario.fotoURL
      });
      console.log("Usuario creado con ID: ", userId);
    } catch (e) {
      console.error("Error al crear usuario: ", e);
      throw e;
    }
  };
// Función para crear un tipo de documento
export const crearTipoDocumento = async (id, nombre) => {
  try {
    const docRef = await addDoc(collection(db, "tipodocumento"), {
      Id: id,
      Nombre: nombre
    });
    console.log("Tipo de documento creado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear tipo de documento: ", e);
  }
};

// Función para crear un rol
export const crearRol = async (nombre) => {
  try {
    const docRef = await addDoc(collection(db, "roles"), {
      Nombre: nombre
    });
    console.log("Rol creado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear rol: ", e);
  }
};
