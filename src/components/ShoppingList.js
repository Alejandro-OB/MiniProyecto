import React, { useState } from 'react';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import './ShoppingList.css';

const ShoppingList = ({ products, onAddProduct, onEditProduct, onDeleteProduct, onToggleComplete }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (productId) => {
    onDeleteProduct(productId);
  };

  const handleSaveEdit = (updatedProduct) => {
    onEditProduct(updatedProduct);
    setEditModalOpen(false);
  };

  return (
    <div className="shopping-list">
      <button className="btn-add-product" onClick={() => setAddModalOpen(true)}>
        + AÑADIR PRODUCTO
      </button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Sitio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={product.comprado || false}  
                    onChange={() => onToggleComplete(product.id, !product.comprado)}
                  />
                </td>
                <td>{product.nombre}</td>
                <td>{product.sitio}</td>
                <td>
                  <button className="btn-save" onClick={() => handleEditClick(product)}>
                    Editar
                  </button>
                  <button className="btn-cancel" onClick={() => handleDeleteClick(product.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="center-align">No hay productos en esta lista.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={onAddProduct}
        />
      )}

      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ShoppingList;
