// src/components/ShoppingList.js
import React from 'react';

const ShoppingList = ({ products, onAddProduct }) => {
  return (
    <div>
      <table className="highlight centered striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Sitio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.nombre}</td>
              <td>{product.sitio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Botón de añadir producto */}
      <div className="center-align" style={{ marginTop: '20px' }}>
        <button 
          className="btn waves-effect waves-light teal lighten-1" 
          onClick={onAddProduct}
        >
          + Añadir Producto
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;
