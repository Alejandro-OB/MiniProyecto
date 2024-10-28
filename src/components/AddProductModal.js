// src/components/AddProductModal.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AddSiteModal from './AddSiteModal';  // Importa el nuevo modal
import './ModalStyles.css';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [nombre, setNombre] = useState('');
  const [sitio, setSitio] = useState('');
  const [isAddSiteModalOpen, setAddSiteModalOpen] = useState(false); // Estado para el segundo modal

  const handleAddProduct = async () => {
    if (!nombre || !sitio) {
      alert("Por favor, completa ambos campos.");
      return;
    }

    try {
      await addDoc(collection(db, 'productos'), {
        nombre,
        sitio,
      });
      console.log('Producto agregado exitosamente');
      onAdd();
      onClose();
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4 className="center-align">Nuevo producto</h4>
        <div className="input-field">
          <input 
            type="text" 
            placeholder="Aquí el nombre del producto" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <div className="input-field">
          <select
            value={sitio}
            onChange={(e) => setSitio(e.target.value)}
          >
            <option value="" disabled>Seleccionar sitio...</option>
            <option value="Sitio 1">Sitio 1</option>
            <option value="Sitio 2">Sitio 2</option>
          </select>
          <button 
            className="btn-add-site"
            onClick={() => setAddSiteModalOpen(true)}  // Abre el modal de agregar sitio
          >
            +
          </button>
        </div>
        <div className="modal-buttons">
          <button className="btn-save" onClick={handleAddProduct}>Guardar</button>
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        </div>

        {/* Modal para agregar un nuevo sitio */}
        {isAddSiteModalOpen && (
          <AddSiteModal
            isOpen={isAddSiteModalOpen}
            onClose={() => setAddSiteModalOpen(false)}
            onAdd={(newSite) => setSitio(newSite)}  // Asigna el sitio seleccionado
          />
        )}
      </div>
    </div>
  );
};

export default AddProductModal;
