import React, { useState } from 'react';
import { agregarSitio } from '../services/firestoreService';

const AddSiteModal = ({ isOpen, onClose, onAdd }) => {
  const [nombreSitio, setNombreSitio] = useState('');
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState(''); // Estado para el mensaje de confirmación

  const handleAddSite = async () => {
    if (!nombreSitio.trim()) {
      alert("Por favor, ingresa el nombre del sitio.");
      return;
    }

    try {
      const sitioId = await agregarSitio(nombreSitio);
      const newSite = { id: sitioId, Nombre: nombreSitio };
      onAdd(newSite);

      // Muestra el mensaje de confirmación y limpia la entrada
      setMensajeConfirmacion("Sitio agregado exitosamente.");
      setNombreSitio('');

      // Oculta el mensaje después de 3 segundos
      setTimeout(() => setMensajeConfirmacion(''), 3000);
    } catch (e) {
      console.error("Error al agregar el sitio:", e);
      alert("Error al agregar el sitio. Por favor, intenta de nuevo.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Nuevo Sitio</h4>
        
        {/* Muestra el mensaje de confirmación si existe */}
        {mensajeConfirmacion && (
          <p style={{ color: 'green', fontSize: '14px' }}>{mensajeConfirmacion}</p>
        )}
        
        <input
          type="text"
          placeholder="Nombre del sitio"
          value={nombreSitio}
          onChange={(e) => setNombreSitio(e.target.value)}
        />
        
        <div className="modal-buttons">
          <button className="btn-save" onClick={handleAddSite}>Guardar</button>
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AddSiteModal;

