// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import LoginModal from './components/LoginModal';
import Home from './components/Home';
import { auth } from './firebaseConfig';

function MainApp() {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Maneja el inicio de sesión exitoso
  const handleLogin = (userData) => {
    setUser(userData);
    setLoginOpen(false);
    navigate('/'); // Redirige a la página principal después de iniciar sesión
  };

  // Función para cerrar la sesión
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper teal">
          <ul className="right hide-on-med-and-down">
            <li><Link to="/">Inicio</Link></li>
            <li>
              {user ? (
                <a href="#!" onClick={handleLogout}>Cerrar Sesión</a>
              ) : (
                <a href="#!" onClick={() => setLoginOpen(true)}>Iniciar Sesión</a>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />

      {/* Rutas de la SPA */}
      <div className="container">
        <Routes>
          {/* Ruta principal muestra Home.js */}
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={!!user}
                onStartLogin={() => setLoginOpen(true)}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
