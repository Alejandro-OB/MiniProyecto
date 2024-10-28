import React, { useState, useEffect } from 'react';
import ShoppingList from './ShoppingList';
import { obtenerProductos, eliminarProducto, actualizarProducto } from '../services/firestoreService';

const Home = ({ isAuthenticated, onStartLogin }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      const productosObtenidos = await obtenerProductos();
      setProducts(productosObtenidos);
    };
    cargarProductos();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleEditProduct = async (updatedProduct) => {
    await actualizarProducto(updatedProduct.id, { nombre: updatedProduct.nombre, sitio: updatedProduct.sitio });

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
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
        <h3>Bienvenido a la Lista de Compras</h3>
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

  return (
    <div className="center-align">
      <h3>Lista de Compras</h3>
      <ShoppingList
        products={products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default Home;
