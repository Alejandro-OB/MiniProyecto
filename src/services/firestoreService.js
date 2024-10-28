// firestoreService.js
import { db } from "../firebaseConfig";
import { doc, setDoc, getDocs, addDoc, deleteDoc, updateDoc, collection, query, orderBy, limit } from "firebase/firestore";

// Función para actualizar un producto en Firebase
export const actualizarProducto = async (productId, updatedData) => {
  try {
    const productRef = doc(db, "productos", productId);
    await updateDoc(productRef, updatedData);
    console.log("Producto actualizado con ID:", productId);
  } catch (e) {
    console.error("Error al actualizar producto:", e);
  }
};

// Función para crear una lista de compras
export const crearListaCompras = async (ultimaLista = null) => {
  try {
    const listaData = { FechaRegistro: new Date() };
    if (ultimaLista) {
      listaData.productos = ultimaLista.productos; // Copia los productos de la última lista
    }
    const docRef = await addDoc(collection(db, "listacompras"), listaData);
    console.log("Lista de compras creada con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear la lista de compras: ", e);
  }
};

// Función para obtener la última lista de compras
export const obtenerUltimaLista = async () => {
  try {
    const listaRef = collection(db, "listacompras");
    const q = query(listaRef, orderBy("FechaRegistro", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  } catch (e) {
    console.error("Error al obtener la última lista: ", e);
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

// Función para obtener la lista de sitios desde Firebase
export const obtenerSitios = async () => {
  try {
    const sitiosSnapshot = await getDocs(collection(db, "sitios"));
    const sitios = sitiosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return sitios;
  } catch (e) {
    console.error("Error al obtener sitios: ", e);
    return []; // Devuelve una lista vacía en caso de error
  }
};

// Función para agregar un nuevo sitio a Firebase
export const agregarSitio = async (nombre) => {
  try {
    const docRef = await addDoc(collection(db, "sitios"), {
      Nombre: nombre,
      FechaRegistro: new Date()
    });
    console.log("Sitio agregado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al agregar sitio: ", e);
    throw e; // Lanza el error para manejarlo en el componente
  }
};

// Función para obtener la lista de productos desde Firebase
export const obtenerProductos = async () => {
  try {
    const productosSnapshot = await getDocs(collection(db, "productos"));
    const productos = productosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productos;
  } catch (e) {
    console.error("Error al obtener productos: ", e);
    return []; // Devuelve una lista vacía en caso de error
  }
};

// Función para agregar un nuevo producto a Firebase
export const agregarProducto = async (nombre, sitio) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), {
      nombre,
      sitio,
      FechaRegistro: new Date()
    });
    console.log("Producto agregado con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al agregar producto: ", e);
    throw e; // Lanza el error para manejarlo en el componente
  }
};

// Función para eliminar un producto de Firebase
export const eliminarProducto = async (productId) => {
  try {
    await deleteDoc(doc(db, "productos", productId));
    console.log("Producto eliminado con ID:", productId);
  } catch (e) {
    console.error("Error al eliminar producto:", e);
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
