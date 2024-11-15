import React, { useState, useEffect } from 'react';
import ShoppingList from './ShoppingList';
import Slider from "react-slick";
import NewListModal from './NewListModal';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { obtenerProductos, eliminarProducto, actualizarProducto, agregarProducto, eliminarLista} from '../services/firestoreService';
import { obtenerListas, crearLista } from '../services/firestoreService';

const Home = ({ onStartLogin }) => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setCurrentUser(user);
      if (user) {
        cargarListas();
      }
    });
    return () => unsubscribe();
  }, []);

  const cargarListas = async () => {
    const listasObtenidas = await obtenerListas();
    const listasOrdenadas = listasObtenidas.sort((a, b) => b.fechaRegistro - a.fechaRegistro);
    setLists(listasOrdenadas);
  };


  useEffect(() => {
    if (selectedList) {
      const cargarProductos = async () => {
        const productosObtenidos = await obtenerProductos(selectedList.id);
        setProducts(productosObtenidos);
      };
      cargarProductos();
    }
  }, [selectedList]);

  const handleCreateList = () => {
    setIsModalOpen(true); 
  };

  const handleSaveList = async (nombreLista) => {
    const nuevaLista = await crearLista(nombreLista);
    setLists((prevLists) => [nuevaLista, ...prevLists]);
    setSelectedList(nuevaLista);
  };

  const handleDuplicateList = () => {
    setIsDuplicateModalOpen(true);
  };

  const handleSaveDuplicateList = async (nombreLista) => {
    const nuevaLista = await crearLista(nombreLista);
    const productosDuplicados = products.map((product) => ({
      ...product,
      idLista: nuevaLista.id,
    }));

    for (const product of productosDuplicados) {
      await agregarProducto(product);
    }
    setLists((prevLists) => [nuevaLista, ...prevLists]);
    setSelectedList(nuevaLista);
    setIsDuplicateModalOpen(false);
  };

  const handleSelectList = (list) => {
    setSelectedList(list);
    setProducts([]);
  };

  const handleAddProduct = async (newProduct) => {
    const productWithListId = { ...newProduct, idLista: selectedList.id };
    const addedProduct = await agregarProducto(productWithListId);
    setProducts((prevProducts) => [...prevProducts, addedProduct]);
  };

  const handleEditProduct = async (updatedProduct) => {
    await actualizarProducto(updatedProduct.id, { nombre: updatedProduct.nombre, sitio: updatedProduct.sitio });
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleToggleComplete = async (productId, comprado) => {
    await actualizarProducto(productId, { comprado });
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, comprado } : product
      )
    );
  };

  const handleDeleteProduct = async (productId) => {
    await eliminarProducto(productId);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleDeleteList = async () => {
    if (selectedList) {
      for (const product of products) {
        await eliminarProducto(product.id);
      }
      await eliminarLista(selectedList.id);
      setLists((prevLists) => prevLists.filter((list) => list.id !== selectedList.id));
      setSelectedList(null);
      setProducts([]);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (index) => setSelectedList(lists[index])
  };

 return (
    <div className="main-container">
      {!isAuthenticated ? (
        <div className="center-align">
          <h3>Bienvenido a SmartList</h3>
          <p>Para administrar tu lista de compras, debes iniciar sesión.</p>
          <button
            className="btn waves-effect waves-light teal"
            onClick={onStartLogin}
          >
            Iniciar Sesión
          </button>
        </div>
      ) : (
        <>

          <div className="left-panel">
            <h3>LISTA DE COMPRAS</h3>
            <button className="btn" onClick={handleCreateList}>Crear Nueva Lista</button>
            {selectedList && (
              <>
                <button className="btn" onClick={handleDuplicateList}>Duplicar Lista Actual</button>
                <button className="btn red" onClick={handleDeleteList}>Eliminar Lista Actual</button>
              </>
            )}
            <Slider {...settings} className="slider">
              {lists.map((list) => (
                <div key={list.id}>
                  <button
                    className="btn" 
                    onClick={() => setSelectedList(list)}
                  >
                    {list.nombre}
                  </button>
                </div>
              ))}
            </Slider>
          </div>

          <div className="right-panel">
            {selectedList && (
              <>
                <ShoppingList
                  products={products}
                  onAddProduct={handleAddProduct}
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onToggleComplete={handleToggleComplete}
                  selectedList={selectedList}
                />
              </>
            )}
          </div>
        </>
      )}

      <NewListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveList}
      />     

      <NewListModal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        onSave={handleSaveDuplicateList}
      />  
    </div>
  );
};

export default Home;
