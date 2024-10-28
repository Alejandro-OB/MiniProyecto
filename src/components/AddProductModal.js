import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AddSiteModal from './AddSiteModal';
import { obtenerSitios } from '../services/firestoreService';
import './ModalStyles.css';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [nombre, setNombre] = useState('');
  const [sitio, setSitio] = useState('');
  const [sitios, setSitios] = useState([]);
  const [isAddSiteModalOpen, setAddSiteModalOpen] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  useEffect(() => {
    const cargarSitios = async () => {
      const sitiosObtenidos = await obtenerSitios();
      setSitios(sitiosObtenidos);
    };

    if (isOpen) {
      cargarSitios();
    }
  }, [isOpen]);

  const handleAddProduct = async () => {
    if (!nombre || !sitio) {
      alert("Por favor, completa ambos campos.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'productos'), {
        nombre,
        sitio,
      });
      const newProduct = { id: docRef.id, nombre, sitio }; // Crea el objeto del nuevo producto

      onAdd(newProduct); // Pasa el nuevo producto a Home.js
      setMensajeConfirmacion("Producto agregado exitosamente.");
      setNombre('');
      setSitio('');
      
      setTimeout(() => setMensajeConfirmacion(''), 3000);
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert("Error al agregar producto. Inténtalo de nuevo.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4 className="center-align">Nuevo producto</h4>
        {mensajeConfirmacion && (
          <p style={{ color: 'green', fontSize: '14px' }}>{mensajeConfirmacion}</p>
        )}
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
            {sitios.map((sitio) => (
              <option key={sitio.id} value={sitio.Nombre}>
                {sitio.Nombre}
              </option>
            ))}
          </select>
          <button 
            className="btn-add-site"
            onClick={() => setAddSiteModalOpen(true)}
          >
            +
          </button>
        </div>
        <div className="modal-buttons">
          <button className="btn-save" onClick={handleAddProduct}>Guardar</button>
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        </div>

        {isAddSiteModalOpen && (
          <AddSiteModal
            isOpen={isAddSiteModalOpen}
            onClose={() => setAddSiteModalOpen(false)}
            onAdd={(newSite) => {
              setSitio(newSite.Nombre); 
              setSitios([...sitios, newSite]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddProductModal;
