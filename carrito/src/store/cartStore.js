import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  
  // Agregar item al carrito
 addItem: (incomingFood) => {
    
    // 1. Estandarizamos el objeto de entrada a nuestro formato interno (name/price)
    const product = {
        // Usamos el ID para las verificaciones de duplicados
        id: incomingFood.id || incomingFood.nombre, 
        
        // Mapeo: 'nombre' del catálogo pasa a ser 'name' interno
        name: incomingFood.nombre,
        
        // Mapeo: 'precio' del catálogo pasa a ser 'price' interno
        // Aseguramos que sea un número (float) y si falla, usamos 0.
        price: parseFloat(incomingFood.precio) || 0,
        
        // Opcional: pasar la imagen u otras propiedades.
        image: incomingFood.imagen, 
    };

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
        // 2. Insertamos el producto estandarizado con quantity: 1
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