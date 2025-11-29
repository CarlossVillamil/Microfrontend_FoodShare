import React, { useEffect } from 'react';
import useCartStore from '../store/cartStore';
import CartItem from './CartItem';

const MiniCart = () => {
  const { items, getTotal, getItemCount, clearCart, addItem } = useCartStore();
  
  const total = getTotal();
  const itemCount = getItemCount();

  // 🎧 Escuchar eventos del catálogo
  useEffect(() => {
    const handleAddToCart = (event) => {
      const product = event.detail;
      console.log("✅ Producto recibido desde catálogo:", product);
      addItem(product);
    };

    window.addEventListener('foodshare:add', handleAddToCart);

    return () => {
      window.removeEventListener('foodshare:add', handleAddToCart);
    };
  }, [addItem]);

  return (
    <div style={styles.container}>
      {/* Header minimalista */}
      <div style={styles.header}>
        <h3 style={styles.title}>Carrito</h3>
        {itemCount > 0 && (
          <div style={styles.badge}>{itemCount}</div>
        )}
      </div>
      
      {/* Contenido */}
      {items.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🛒</div>
          <p style={styles.emptyText}>Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          {/* Lista de productos */}
          <div style={styles.itemsList}>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          {/* Footer con total */}
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total</span>
              <span style={styles.totalAmount}>${total.toFixed(2)}</span>
            </div>
            
            <button style={styles.checkoutButton}>
              Finalizar Compra
            </button>
            
            <button style={styles.clearButton} onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    maxWidth: '380px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #f0f0f0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: '-0.02em'
  },
  badge: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    borderRadius: '12px',
    padding: '4px 10px',
    fontSize: '13px',
    fontWeight: '600',
    minWidth: '24px',
    textAlign: 'center'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  emptyIcon: {
    fontSize: '56px',
    marginBottom: '16px',
    opacity: 0.3
  },
  emptyText: {
    margin: 0,
    fontSize: '15px',
    color: '#999999',
    fontWeight: '400'
  },
  itemsList: {
    marginBottom: '24px',
    maxHeight: '400px',
    overflowY: 'auto',
    overflowX: 'hidden',
    // Scrollbar personalizado (webkit)
    scrollbarWidth: 'thin',
    scrollbarColor: '#e0e0e0 transparent'
  },
  footer: {
    borderTop: '1px solid #f0f0f0',
    paddingTop: '20px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  totalLabel: {
    fontSize: '16px',
    color: '#666666',
    fontWeight: '500'
  },
  totalAmount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: '-0.02em'
  },
  checkoutButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '10px',
    transition: 'all 0.2s ease',
    letterSpacing: '-0.01em'
  },
  clearButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#999999',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  }
};

export default MiniCart;