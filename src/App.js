// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import M from 'materialize-css';
import './App.css';

import LoginModal from './components/LoginModal';
import ShoppingList from './components/ShoppingList';
import AddProductModal from './components/AddProductModal';
import Home from './components/Home';
import { auth } from './firebaseConfig';

function MainApp() {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([
    { id: 1, nombre: 'Tomate', sitio: 'Placita campesina' },
    { id: 2, nombre: 'Jabón', sitio: 'D1' },
    { id: 3, nombre: 'Arroz', sitio: 'ARA' },
  ]);
  const [isAddProductOpen, setAddProductOpen] = useState(false);

  // Maneja el inicio de sesión exitoso
  const handleLogin = (userData) => {
    setUser(userData);
    setLoginOpen(false);
    navigate('/productos'); // Redirige a productos tras inicio de sesión
  };

  // Función para cerrar la sesión
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    navigate('/');
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // Componente para proteger la ruta de productos
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper teal">
          <ul className="right hide-on-med-and-down">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
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
          <Route path="/" element={<Home onStartLogin={() => setLoginOpen(true)} />} />
          <Route
            path="/productos"
            element={
              <ProtectedRoute>
                <ShoppingList 
                  products={products} 
                  onAddProduct={() => setAddProductOpen(true)} 
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Modal para Añadir Producto */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setAddProductOpen(false)}
        onAdd={addProduct}
      />
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
