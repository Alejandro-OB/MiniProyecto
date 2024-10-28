import React, { useState, useEffect } from 'react';

const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [nombre, setNombre] = useState(product.nombre || '');
  const [sitio, setSitio] = useState(product.sitio || '');

  useEffect(() => {
    setNombre(product.nombre || '');
    setSitio(product.sitio || '');
  }, [product]);

  const handleSave = () => {
    const updatedProduct = { ...product, nombre, sitio };
    onSave(updatedProduct);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Editar Producto</h4>
        <div className="input-field">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Sitio"
            value={sitio}
            onChange={(e) => setSitio(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button className="btn-save" onClick={handleSave}>Guardar</button>
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
