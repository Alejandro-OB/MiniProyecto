// src/components/LoginModal.js
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { crearUsuario } from "../services/firestoreService"; // Importa la función crearUsuario
import M from 'materialize-css';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Campos adicionales para el registro
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    M.AutoInit();
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, []);

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setDocumentType('');
    setDocumentNumber('');
    setGender('');
    setPhoneNumber('');
    setBirthdate('');
    setError('');
  };

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google login successful:", result.user); // Debug
      onLogin(result.user);
      resetFields();
      onClose();
    } catch (error) {
      setError("Error al iniciar sesión con Google.");
      console.error("Error en Google Login:", error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');

    const formattedEmail = email.trim().toLowerCase();
    const formattedPassword = password.trim();

    console.log("Attempting to sign in with:", formattedEmail); // Debug

    if (formattedEmail.length > 40) {
      setError("El email no debe exceder los 40 caracteres.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, formattedEmail, formattedPassword);
      console.log("Login successful:", result.user); // Debug
      onLogin(result.user);
      resetFields();
      onClose();
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error en el inicio de sesión:", error); // Debug
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const formattedEmail = email.trim().toLowerCase();
    const formattedPassword = password.trim();

    if (formattedEmail.length > 40 || formattedPassword.length < 6) {
      setError("El email debe tener menos de 40 caracteres y la contraseña al menos 6 caracteres.");
      return;
    }

    if (!birthdate || !documentNumber || !phoneNumber) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formattedEmail, formattedPassword);
      const user = userCredential.user;

      // Crear el objeto de datos del usuario
      const userData = {
        nombres: firstName,
        apellidos: lastName,
        tipoDocumento: documentType,
        numeroDocumento: documentNumber,
        genero: gender,
        correo: formattedEmail,
        telefono: phoneNumber,
        rol: "user",
        fechaNacimiento: birthdate,
        fotoURL: "", // Puedes agregar un campo para la URL de la foto si es necesario
      };

      // Guardar en Firestore usando la función crearUsuario de firestoreService
      await crearUsuario(user.uid, userData);

      console.log("Registro exitoso:", user); // Debug
      onLogin(user);
      resetFields();
      onClose();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("El correo electrónico ya está en uso. Por favor, inicia sesión o usa otro correo.");
      } else if (error.code === 'auth/invalid-email') {
        setError("El formato del correo electrónico no es válido.");
      } else if (error.code === 'auth/weak-password') {
        setError("La contraseña es demasiado débil. Debe tener al menos 6 caracteres.");
      } else {
        setError("Error al registrar el usuario. Verifica tus datos.");
      }
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content card" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h4 className="center-align">{isRegisterMode ? "Registrarse" : "Iniciar Sesión"}</h4>

        <form onSubmit={isRegisterMode ? handleRegister : handleEmailLogin}>
          {isRegisterMode && (
            <>
              <div className="input-field">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <label>Nombre</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <label>Apellido</label>
              </div>
              
              <div className="input-field">
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  required
                >
                  <option value="" disabled>Seleccione el tipo de documento</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PA">Pasaporte</option>
                </select>
                <label>Tipo de Documento</label>
              </div>

              <div className="input-field">
                <input
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  required
                />
                <label>Número de Documento</label>
              </div>

              <div className="input-field">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>Seleccione el género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
                <label>Género</label>
              </div>

              <div className="input-field">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <label>Teléfono Móvil</label>
              </div>
              
              <div className="input-field">
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
                <label>Fecha de Nacimiento</label>
              </div>
            </>
          )}
          
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
            {isRegisterMode ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn waves-effect waves-light full-width"
          style={{ marginTop: '10px' }}
        >
          {isRegisterMode ? "Registrarse con Google" : "Iniciar sesión con Google"}
        </button>

        {error && <p className="error red-text">{error}</p>}

        <div className="register-close-container">
          <button
            className="btn-flat teal-text"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              resetFields();
            }}
            style={{ marginTop: '10px' }}
          >
            {isRegisterMode ? "¿Ya tienes una cuenta? Inicia Sesión" : "¿No tienes una cuenta? Regístrate"}
          </button>

          <button
            className="btn-flat red-text close-button"
            onClick={() => {
              onClose();
              resetFields();
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
