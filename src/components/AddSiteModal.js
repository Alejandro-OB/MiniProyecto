// src/components/AddSiteModal.js
import React, { useState } from 'react';
import './ModalStyles.css';

const AddSiteModal = ({ isOpen, onClose, onAdd }) => {
  const [newSite, setNewSite] = useState('');

  const handleAddSite = () => {
    if (!newSite) {
      alert("Por favor, selecciona un sitio.");
      return;
    }
    onAdd(newSite);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4 className="center-align">Agregar Sitio</h4>
        <div className="input-field">
          <input 
            type="text" 
            placeholder="Nombre del sitio" 
            value={newSite} 
            onChange={(e) => setNewSite(e.target.value)} 
          />
        </div>
        <div className="modal-buttons">
          <button className="btn-save" onClick={handleAddSite}>Guardar</button>
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AddSiteModal;
