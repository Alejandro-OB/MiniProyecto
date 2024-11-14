
import React, { useState } from 'react';
import './ModalStyles.css'; 
const NewListModal = ({ isOpen, onClose, onSave }) => {
  const [listName, setListName] = useState('');

  const handleSave = () => {
    if (listName.trim() !== '') {
      onSave(listName);
      setListName(''); // Limpiar el campo después de guardar
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Crear Nueva Lista</h2>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Nombre de la lista"
            className="modal-input"
          />
          <div className="modal-buttons">
            <button className="btn-save" onClick={handleSave}>Guardar</button>
            <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    )
  );
};

export default NewListModal;
