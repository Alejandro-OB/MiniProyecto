import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import M from 'materialize-css';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    M.AutoInit();
  }, []);

  if (!isOpen) return null;

  // Función para autenticarse con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin(result.user); // Aquí puedes pasar los datos de usuario al padre
      onClose(); // Cierra el modal al iniciar sesión correctamente
    } catch (error) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  // LoginModal.js
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // Validar longitud del login
    if (email.length > 40) {
        setError("El login debe tener un máximo de 40 caracteres.");
        return;
    }

    // Convertir login a minúsculas para consistencia en la validación
    const formattedEmail = email.toLowerCase();

    // Validación de longitud de la contraseña
    if (password.length > 250) {
        setError("La contraseña no puede superar los 250 caracteres.");
        return;
    }

    try {
        const result = await signInWithEmailAndPassword(auth, formattedEmail, password);
        onLogin(result.user);
        onClose();
    } catch (error) {
        setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content card">
        <h4 className="center-align">Iniciar Sesión</h4>

        {/* Formulario de inicio de sesión con correo y contraseña */}
        <form onSubmit={handleEmailLogin}>
          <div className="input-field">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="validate"
            />
            <label htmlFor="email">Correo electrónico</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="validate"
            />
            <label htmlFor="password">Contraseña</label>
          </div>

          <button type="submit" className="btn waves-effect waves-light full-width">
            Iniciar sesión
          </button>
        </form>

        {/* Botón de Inicio de Sesión con Google */}
        <button onClick={handleGoogleLogin} className="btn waves-effect waves-light full-width" style={{ marginTop: '10px' }}>
          Iniciar sesión con Google
        </button>

        {/* Mensaje de Error */}
        {error && <p className="error red-text">{error}</p>}

        {/* Botón de Cerrar */}
        <button className="btn-flat red-text" onClick={onClose} style={{ marginTop: '10px' }}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
