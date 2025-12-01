import React from 'react';
import useCartStore from '../store/cartStore';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div style={styles.item}>
      <div style={styles.itemInfo}>
        <h4 style={styles.itemName}>{item.name}</h4>
        <p style={styles.itemPrice}>${item.price.toFixed(2)} c/u</p>
      </div>
      
      <div style={styles.controls}>
        <div style={styles.quantityControl}>
          <button 
            style={styles.quantityButton}
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span style={styles.quantity}>{item.quantity}</span>
          <button 
            style={styles.quantityButton}
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        
        <div style={styles.subtotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        
        <button 
          style={styles.removeButton}
          onClick={() => removeItem(item.id)}
        >
          {"🗑️"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  item: {
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  itemInfo: {
    marginBottom: '10px'
  },
  itemName: {
    margin: '0 0 5px 0',
    fontSize: '16px',
    color: '#333'
  },
  itemPrice: {
    margin: 0,
    color: '#666',
    fontSize: '14px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '18px'
  },
  quantity: {
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center'
  },
  subtotal: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4CAF50'
  },
  removeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px'
  }
};

export default CartItem;