// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import M from 'materialize-css';
import './App.css';


import LoginModal from './components/LoginModal';
import ShoppingList from './components/ShoppingList';
import AddProductModal from './components/AddProductModal';
import Home from './components/Home';

function App() {
  useEffect(() => {
    M.AutoInit(); // Inicializar Materialize
  }, []);

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, nombre: 'Tomate', sitio: 'Placita campesina' },
    { id: 2, nombre: 'Jabón', sitio: 'D1' },
    { id: 3, nombre: 'Arroz', sitio: 'ARA' },
  ]);
  const [isAddProductOpen, setAddProductOpen] = useState(false);

  const handleLogin = async (email, password) => {
    console.log('Iniciando sesión con:', email, password);
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <Router>
      <div>
        {/* Barra de Navegación */}
        <nav>
          <div className="nav-wrapper teal">
            <ul className="right hide-on-med-and-down">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><a href="#!" onClick={() => setLoginOpen(true)}>Iniciar Sesión</a></li>
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
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={
              <ShoppingList 
                products={products} 
                onAddProduct={() => setAddProductOpen(true)} 
              />
            } />
          </Routes>
        </div>

        {/* Modal para Añadir Producto */}
        <AddProductModal
          isOpen={isAddProductOpen}
          onClose={() => setAddProductOpen(false)}
          onAdd={addProduct}
        />
      </div>
    </Router>
  );
}

export default App;
