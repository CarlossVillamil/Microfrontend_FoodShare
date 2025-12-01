import React, { useState, useEffect } from 'react';
import useCartStore from '../store/cartStore';
import CartItem from './CartItem';

const MiniCart = () => {
  const { items, getTotal, getItemCount, clearCart, addItem } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const total = getTotal();
  const itemCount = getItemCount();

  // 🎧 Escuchar eventos del catálogo
  useEffect(() => {
    const handleAddToCart = (event) => {
      const product = event.detail;
      console.log("✅ Producto recibido desde catálogo:", product);
      addItem(product);

      // Mostrar notificación
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);

      // Abrir carrito brevemente
      setIsOpen(true);
    };

    window.addEventListener('foodshare:add', handleAddToCart);

    return () => {
      window.removeEventListener('foodshare:add', handleAddToCart);
    };
  }, [addItem]);

  const handleCheckout = () => {
    if (items.length === 0) return;

    // 1. Prepara el payload con la información de la compra
    const orderPayload = {
        orderId: `ORDER-${Date.now()}`, // ID temporal de la orden
        items: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
        })),
        totalAmount: total, // El total calculado
        currency: 'USD', // O la moneda correspondiente
    };

    // 2. Crea un evento personalizado para iniciar el pago
    const checkoutEvent = new CustomEvent('mf:start-checkout', {
        detail: orderPayload,
        bubbles: true,
        composed: true,
    });

    // 3. Publica el evento en el ámbito global (window)
    window.dispatchEvent(checkoutEvent);
    console.log("🛒 Carrito: Evento mf:start-checkout publicado.", orderPayload);
    
    // Opcional: Cerrar el carrito desplegable o mostrar un loader
};

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...styles.floatingButton,
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
      >
        <span style={styles.cartIcon}>🛒</span>
        {itemCount > 0 && (
          <span style={styles.floatingBadge}>{itemCount}</span>
        )}
      </button>

      {/* Notificación de producto agregado */}
      {showNotification && (
        <div style={styles.notification}>
          <span style={styles.notificationIcon}>✓</span>
          Producto agregado al carrito
        </div>
      )}

      {/* Overlay oscuro */}
      {isOpen && (
        <div
          style={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel lateral del carrito */}
      <div style={{
        ...styles.sidePanel,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
      }}>
        {/* Header del panel */}
        <div style={styles.panelHeader}>
          <div style={styles.panelTitle}>
            <span style={styles.cartIconLarge}>🛒</span>
            <div>
              <h3 style={styles.title}>Mi Carrito</h3>
              <p style={styles.subtitle}>
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={styles.closeButton}
          >
            ✕
          </button>
        </div>

        {/* Contenido del carrito */}
        <div style={styles.panelContent}>
          {items.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>🛍️</div>
              <p style={styles.emptyText}>Tu carrito está vacío</p>
              <p style={styles.emptySubtext}>
                Agrega productos desde el menú
              </p>
            </div>
          ) : (
            <>
              {/* Lista de productos con scroll */}
              <div style={styles.itemsList}>
                {items.map(item => (
                  <div key={item.id} style={styles.itemWrapper}>
                    <CartItem item={item} />
                  </div>
                ))}
              </div>

              {/* Footer fijo con total y botones */}
              <div style={styles.panelFooter}>
                {/* Resumen */}
                <div style={styles.summary}>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Subtotal</span>
                    <span style={styles.summaryValue}>${total.toFixed(2)}</span>
                  </div>
                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Envío</span>
                    <span style={styles.summaryValue}>Gratis</span>
                  </div>
                  <div style={styles.totalRow}>
                    <span style={styles.totalLabel}>Total</span>
                    <span style={styles.totalAmount}>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Botones de acción */}
                <button
                  style={styles.checkoutButton}
                  onClick={handleCheckout} // 🔑 Llama a la nueva función
                >
                  Finalizar Compra
                </button>

                <button
                  style={styles.clearButton}
                  onClick={clearCart}
                >
                  <span style={styles.buttonIcon}>🗑️</span>
                  Vaciar carrito
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  // Botón flotante
  floatingButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000
  },
  cartIcon: {
    fontSize: '28px'
  },
  floatingBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    border: '3px solid white'
  },

  // Notificación
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: 2000,
    animation: 'slideInRight 0.3s ease'
  },
  notificationIcon: {
    fontSize: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Overlay
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001,
    animation: 'fadeIn 0.3s ease'
  },

  // Panel lateral
  sidePanel: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '450px',
    backgroundColor: '#ffffff',
    boxShadow: '-8px 0 40px rgba(0, 0, 0, 0.15)',
    zIndex: 1002,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  // Header del panel
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: '#fafafa'
  },
  panelTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  cartIconLarge: {
    fontSize: '32px'
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: '-0.02em'
  },
  subtitle: {
    margin: '4px 0 0 0',
    fontSize: '14px',
    color: '#666666',
    fontWeight: '400'
  },
  closeButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f5f5f5',
    color: '#666666',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },

  // Contenido
  panelContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },

  // Estado vacío
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px'
  },
  emptyIcon: {
    fontSize: '80px',
    opacity: 0.3,
    marginBottom: '20px'
  },
  emptyText: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a'
  },
  emptySubtext: {
    margin: 0,
    fontSize: '14px',
    color: '#999999'
  },

  // Lista de items
  itemsList: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  itemWrapper: {
    animation: 'slideInUp 0.3s ease'
  },

  // Footer del panel
  panelFooter: {
    padding: '24px',
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#fafafa'
  },
  summary: {
    marginBottom: '20px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#666666',
    fontWeight: '500'
  },
  summaryValue: {
    fontSize: '14px',
    color: '#1a1a1a',
    fontWeight: '500'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '2px solid #e0e0e0',
    marginTop: '8px'
  },
  totalLabel: {
    fontSize: '16px',
    color: '#1a1a1a',
    fontWeight: '700'
  },
  totalAmount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: '-0.02em'
  },

  // Botones
  checkoutButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '12px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  clearButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: 'transparent',
    color: '#666666',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  buttonIcon: {
    fontSize: '18px'
  }
};

export default MiniCart;