import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Esperar a que el DOM esté listo
if (document.getElementById('root')) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
} else {
  // Si el root no existe, esperar a que el DOM cargue
  window.addEventListener('DOMContentLoaded', () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  });
}