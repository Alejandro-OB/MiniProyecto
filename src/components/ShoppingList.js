import React from 'react';
import './ShoppingList.css';

const ShoppingList = ({ products, onAddProduct, onEditProduct, onDeleteProduct, onToggleComplete }) => {
  return (
    <div className="shopping-list">
      <button className="btn-add-product" onClick={() => onAddProduct()}>
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
                    checked={product.comprado || true}
                    onChange={() => onToggleComplete(product.id, !product.comprado)}
                  />
                </td>
                <td>{product.nombre}</td>
                <td>{product.sitio}</td>
                <td>
                  <button className="btn-save" onClick={() => onEditProduct(product)}>
                    Editar
                  </button>
                  <button className="btn-cancel" onClick={() => onDeleteProduct(product.id)}>
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
    </div>
  );
};

export default ShoppingList;
