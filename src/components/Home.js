// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/productos');
  };

  return (
    <div className="center-align">
      <h3>Bienvenido a la Lista de Compras</h3>
      <p>Administra tus productos y sitios de compra en un solo lugar.</p>
      <button 
        className="btn waves-effect waves-light teal" 
        onClick={handleStart}
      >
        EMPEZAR
      </button>
    </div>
  );
};

export default Home;
