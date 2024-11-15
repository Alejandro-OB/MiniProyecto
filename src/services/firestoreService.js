
import { db } from "../firebaseConfig";
import { doc, setDoc, getDocs, addDoc, deleteDoc, updateDoc, collection, query, orderBy, limit, where } from "firebase/firestore";


export const actualizarProducto = async (productId, updatedData) => {
  try {
    const productRef = doc(db, "productos", productId);
    await updateDoc(productRef, updatedData);
    console.log("Producto actualizado con éxito. ID del producto:", productId);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
};


export const crearListaCompras = async (ultimaLista = null) => {
  try {
    const listaData = { FechaRegistro: new Date() };
    if (ultimaLista) {
      listaData.productos = ultimaLista.productos;
    }
    const docRef = await addDoc(collection(db, "listacompras"), listaData);
    console.log("Lista de compras creada con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error al crear la lista de compras: ", e);
  }
};


export const obtenerListas = async () => {
  const listasCollection = collection(db, 'listas');
  const listasSnapshot = await getDocs(listasCollection);
  return listasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const crearLista = async (nombreLista) => {
  const listasCollection = collection(db, 'listas');
  const nuevaListaRef = await addDoc(listasCollection, {
    nombre: nombreLista,
    fechaRegistro: new Date(),
  });
  return { id: nuevaListaRef.id, nombre: nombreLista, fechaRegistro: new Date() };
};


export const eliminarLista = async (listaId) => {
  const listaRef = doc(db, 'listas', listaId);
  await deleteDoc(listaRef);
};


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
    return []; 
  }
};


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
    throw e; 
  }
};



export const obtenerProductos = async (idLista) => {
  const productosCollection = collection(db, 'productos');
  const productosQuery = query(productosCollection, where("idLista", "==", idLista));
  const productosSnapshot = await getDocs(productosQuery);
  return productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const agregarProducto = async (product) => {
  const productosCollection = collection(db, 'productos');
  const productoRef = await addDoc(productosCollection, product);
  return { id: productoRef.id, ...product }; 
};


export const eliminarProducto = async (productId) => {
  try {
    await deleteDoc(doc(db, "productos", productId));
    console.log("Producto eliminado con ID:", productId);
  } catch (e) {
    console.error("Error al eliminar producto:", e);
  }
};


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

export const obtenerNumeroDeAdmins = async () => {
  try {
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("Rol", "==", "admin"));
    const querySnapshot = await getDocs(q);
    
    const numAdmins = querySnapshot.size;
    console.log("admin: "+numAdmins);
    return numAdmins;
  } catch (error) {
    console.error("Error al obtener el número de administradores:", error);
    throw error;
  }
};