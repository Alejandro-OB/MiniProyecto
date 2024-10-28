// src/components/EditProductModal.js
import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import './ModalStyles.css';  // Importa el CSS aquí

const EditProductModal = ({ product, onClose, onSave }) => {
  const [name, setName] = useState(product.name || '');
  const [site, setSite] = useState(product.site || '');

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();  // Asegura que los labels se actualicen al abrir el modal
  }, []);

  const handleSave = () => {
    if (name.trim() === '' || site.trim() === '') {
      alert("Ambos campos son obligatorios.");
      return;
    }
    onSave({ ...product, name, site });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Editar Producto</h4>
        <div className="input-field">
          <input
            id="productName"
            type="text"
            placeholder="Nombre del producto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            id="productSite"
            type="text"
            placeholder="Sitio"
            value={site}
            onChange={(e) => setSite(e.target.value)}
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

