import React, { useState } from 'react';
import EditProductModal from './EditProductModal';
import AddProductModal from './AddProductModal';
import './ShoppingList.css';

const ShoppingList = ({ products, onEditProduct, onDeleteProduct, onAddProduct }) => {
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
      <button
        className="btn add-product-top-button"
        onClick={() => setAddModalOpen(true)}
      >
        + AÑADIR PRODUCTO
      </button>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Sitio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.nombre}</td>
                <td>{product.sitio}</td>
                <td>
                  <div className="table-buttons">
                    <button
                      className="table-button edit"
                      onClick={() => handleEditClick(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="table-button delete"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="center-align">No hay productos en esta lista.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para agregar producto */}
      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={onAddProduct}
        />
      )}

      {/* Modal para editar producto */}
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
