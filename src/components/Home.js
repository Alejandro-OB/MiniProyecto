import React, { useState, useEffect } from 'react';
import ShoppingList from './ShoppingList';
import Slider from "react-slick";
import NewListModal from './NewListModal';
import { obtenerProductos, eliminarProducto, actualizarProducto, agregarProducto } from '../services/firestoreService';
import { obtenerListas, crearLista } from '../services/firestoreService';

const Home = ({ isAuthenticated, onStartLogin }) => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const cargarListas = async () => {
      const listasObtenidas = await obtenerListas();
      const listasOrdenadas = listasObtenidas.sort((a, b) => b.fechaRegistro - a.fechaRegistro);
      setLists(listasOrdenadas);
    };
    cargarListas();
  }, []);

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

  if (!isAuthenticated) {
    return (
      <div className="center-align">
        <h3>Bienvenido SmartList</h3>
        <p>Para administrar tu lista de compras, debes iniciar sesión.</p>
        <button
          className="btn waves-effect waves-light teal"
          onClick={onStartLogin}
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

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
      {/* Panel izquierdo para cambiar de lista y crear nueva lista */}
      <div className="left-panel">
        <h3>LISTA DE COMPRAS</h3>
        <button className="btn" onClick={handleCreateList}>Crear Nueva Lista</button>

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

      {/* Panel derecho para mostrar los productos de la lista seleccionada */}
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
      {/* Modal para crear nueva lista */}
      <NewListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveList}
      />      
    </div>
  );
};

export default Home;
