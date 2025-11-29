import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  
  // Agregar item al carrito
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  
  // Remover item
  removeItem: (productId) => {
    set({ items: get().items.filter(item => item.id !== productId) });
  },
  
  // Actualizar cantidad
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    });
  },
  
  // Limpiar carrito
  clearCart: () => set({ items: [] }),
  
  // Calcular total
  getTotal: () => {
    return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  
  // Obtener cantidad de items
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  }
}));

export default useCartStore;