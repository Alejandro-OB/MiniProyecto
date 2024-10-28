// src/components/Home.js
import React, { useState } from 'react';
import ShoppingList from './ShoppingList';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const Home = ({ isAuthenticated, onStartLogin }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Tomate', site: 'Placita campesina' },
    { id: 2, name: 'Jabón', site: 'D1' },
    { id: 3, name: 'Arroz', site: 'ARA' },
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Función para añadir un producto
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setAddModalOpen(false);
  };

  // Función para editar un producto
  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditModalOpen(false);
  };

  // Función para eliminar un producto
  const handleDeleteProduct = (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    }
  };

  // Muestra un mensaje de inicio de sesión si el usuario no está autenticado
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
      <button 
        className="btn waves-effect waves-light teal"
        onClick={() => setAddModalOpen(true)} // Abre el modal al hacer clic
      >
        + AÑADIR PRODUCTO
      </button>

      {/* Componente de lista de compras */}
      <ShoppingList
        products={products}
        onEdit={(product) => {
          setSelectedProduct(product);
          setEditModalOpen(true);
        }}
        onDelete={handleDeleteProduct}
      />

      {/* Modal para agregar producto */}
      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen} // Asegura que el modal recibe la prop `isOpen`
          onClose={() => setAddModalOpen(false)} // Cierra el modal
          onAdd={handleAddProduct} // Función para añadir producto
        />
      )}

      {/* Modal para editar producto */}
      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditProduct}
        />
      )}
    </div>
  );
};

export default Home;
