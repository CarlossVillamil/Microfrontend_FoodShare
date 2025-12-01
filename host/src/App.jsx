import React, { lazy, Suspense, useState, useEffect } from 'react';

// Importación de MFEs existentes
const FoodList = lazy(() => import('catalogo/FoodList'));
const MiniCart = lazy(() => import('carrito/MiniCart'));

// 🔑 NUEVA IMPORTACIÓN: El Módulo de Pagos
// Asume que el MFE de Pagos se expone como 'payments/PaymentModule'
const PaymentModule = lazy(() => import('payment/PaymentModule')); 

function App() {
  // 🔑 1. Estado para controlar la vista de pago
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [orderPayload, setOrderPayload] = useState(null); // Para guardar los datos del pedido

  // 🔑 2. Escuchar el evento de inicio de pago del Carrito
  useEffect(() => {
    const handleStartCheckout = (event) => {
      const payload = event.detail;
      console.log("Host: Evento de pago detectado. Cambiando a vista de Checkout.");
      setOrderPayload(payload);
      setIsCheckoutActive(true); // Activa la vista de pagos
    };

    // Función para manejar la finalización/cancelación del pago
    // Necesitas que el Módulo de Pagos publique este evento
    const handleEndCheckout = () => {
      setIsCheckoutActive(false); // Vuelve a la vista del catálogo
      setOrderPayload(null);
      console.log("Host: Pago finalizado/cancelado. Volviendo a la vista principal.");
    };

    window.addEventListener('mf:start-checkout', handleStartCheckout);
    // Asume que el MFE de Pagos publica un evento al terminar:
    window.addEventListener('mf:end-checkout', handleEndCheckout);

    return () => {
      window.removeEventListener('mf:start-checkout', handleStartCheckout);
      window.removeEventListener('mf:end-checkout', handleEndCheckout);
    };
  }, []);

  // 🔑 3. Función para renderizar el contenido principal
  const renderMainContent = () => {
    if (isCheckoutActive && orderPayload) {
      // Si el checkout está activo, renderiza el módulo de pagos
      return (
        <Suspense fallback={<LoadingBox text="Cargando módulo de pagos..." />}>
          <PaymentModule 
            // ⚠️ Pasamos los datos del pedido como props al MFE de Pagos
            order={orderPayload} 
            // Podrías pasar el handler de cancelación si no usas el evento global
            onCancel={() => setIsCheckoutActive(false)} 
          />
        </Suspense>
      );
    }

    // Si el checkout no está activo, renderiza el catálogo
    return (
      <Suspense fallback={<LoadingBox text="Cargando menú..." />}>
        <FoodList />
      </Suspense>
    );
  };
  
  return (
    <div style={styles.app}>
      
      {/* Header (se mantiene fijo) */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>{"🍽️"} FoodShare</h1>
          <p style={styles.tagline}>Comparte comida, comparte amor</p>
        </div>
      </header>

      {/* Contenido Principal (Renderizado Condicional) */}
      <div style={styles.container}>
        {renderMainContent()}
      </div>

      {/* Carrito flotante - Se renderiza siempre, pero solo se activa si no hay checkout.
          Podrías optar por ocultarlo completamente si isCheckoutActive es true. */}
      {!isCheckoutActive && (
        <Suspense fallback={null}>
          <MiniCart />
        </Suspense>
      )}

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

// 🔑 CLAVE: La definición de 'styles' debe estar en este punto
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
    opacity: 0.9 
  },
  footerTech: {
    margin: 0,
    fontSize: '12px',
    opacity: 0.6 
  }
};

export default App;