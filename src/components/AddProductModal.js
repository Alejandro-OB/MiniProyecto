// src/components/AddProductModal.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [nombre, setNombre] = useState('');
  const [sitio, setSitio] = useState('');

  const handleAddProduct = async () => {
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content card">
        <h4 className="center-align">Añadir Producto</h4>
        <input 
          type="text" 
          placeholder="Nombre del producto" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Sitio" 
          value={sitio} 
          onChange={(e) => setSitio(e.target.value)} 
        />
        <button className="btn" onClick={handleAddProduct}>Guardar</button>
        <button className="btn-flat red-text" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default AddProductModal;
