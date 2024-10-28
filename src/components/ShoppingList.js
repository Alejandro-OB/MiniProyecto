// src/components/ShoppingList.js
import React, { useState } from 'react';
import EditProductModal from './EditProductModal';
import './ShoppingList.css';


const ShoppingList = ({ products, onEditProduct, onDeleteProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Función para abrir el modal de edición
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  // Función para eliminar producto
  const handleDeleteClick = (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      onDeleteProduct(productId);
    }
  };

  return (
    <div className="shopping-list">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Sitio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.site}</td>
              <td>
                <div className="table-buttons">
                  <button className="table-button edit" onClick={() => handleEditClick(product)}>Editar</button>
                  <button className="table-button delete" onClick={() => handleDeleteClick(product.id)}>Eliminar</button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición de producto */}
      {isEditModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedProduct) => {
            onEditProduct(updatedProduct);
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ShoppingList;
