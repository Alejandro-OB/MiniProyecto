// src/components/AddProductModal.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ModalStyles.css';  // Importa el CSS aquí

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [nombre, setNombre] = useState('');
  const [sitio, setSitio] = useState('');

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
      onAdd(); // Llama a la función para actualizar la lista de productos
      onClose(); // Cierra el modal después de agregar el producto
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4 className="center-align">Añadir Producto</h4>
        <div className="input-field">
          <input 
            id="productName"
            type="text" 
            placeholder="Nombre del producto" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <div className="input-field">
          <input 
            id="productSite"
            type="text" 
            placeholder="Sitio" 
            value={sitio} 
            onChange={(e) => setSitio(e.target.value)} 
          />
        </div>
        <div className="modal-buttons">
          <button className="btn teal" onClick={handleAddProduct}>Guardar</button>
          <button className="btn-flat red-text" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
