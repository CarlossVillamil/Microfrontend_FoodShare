import React, { lazy, Suspense } from 'react';

const FoodList = lazy(() => import('catalogo/FoodList'));
const MiniCart = lazy(() => import('carrito/MiniCart'));

function App() {
  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>{"🍽️"} FoodShare</h1>
          <p style={styles.tagline}>Comparte comida, comparte amor</p>
        </div>
      </header>

      {/* Catálogo a pantalla completa */}
      <div style={styles.container}>
        <Suspense fallback={<LoadingBox text="Cargando menú..." />}>
          <FoodList />
        </Suspense>
      </div>

      {/* Carrito flotante - Se renderiza automáticamente */}
      <Suspense fallback={null}>
        <MiniCart />
      </Suspense>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2024 FoodShare - Proyecto Microfrontends
        </p>
        <p style={styles.footerTech}>
          React 18 • Module Federation • Webpack 5 • Rspack
        </p>
      </footer>
    </div>
  );
}

const LoadingBox = ({ text }) => (
  <div style={styles.loading}>
    <div style={styles.spinner}></div>
    <p>{text}</p>
  </div>
);

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fafafa'
  },
  header: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '32px 20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    textAlign: 'center'
  },
  logo: {
    margin: 0,
    fontSize: '42px',
    fontWeight: '700',
    letterSpacing: '-0.02em'
  },
  tagline: {
    margin: '8px 0 0 0',
    fontSize: '16px',
    opacity: 0.8,
    fontWeight: '400'
  },
  container: {
    flex: 1,
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    padding: '24px'
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f0f0f0',
    borderTop: '3px solid #1a1a1a',
    borderRadius: '50%',
    margin: '0 auto 16px',
    animation: 'spin 1s linear infinite'
  },
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    textAlign: 'center',
    padding: '24px 20px',
    marginTop: 'auto'
  },
  footerText: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    opacity: 0.9  // ← CORREGIDO: Era 0.9' con comilla extra
  },
  footerTech: {
    margin: 0,
    fontSize: '12px',
    opacity: 0.6  // ← CORREGIDO: Era 0.6' con comilla extra
  }
};

export default App;