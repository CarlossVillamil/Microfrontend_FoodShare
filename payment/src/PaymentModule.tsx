import React, { useState } from 'react';

// =================================================================
// 1. DEFINICIÓN DE TIPOS DE DATOS Y PROPS
// =================================================================

/**
 * Define la estructura de un ítem dentro de la orden.
 */
interface IOrderItem {
  id: string | number;
  quantity: number;
  price: number;
  name: string;
}

/**
 * Define la estructura completa del Payload de la Orden de Compra.
 */
interface IOrderPayload {
  orderId: string;
  items: IOrderItem[];
  totalAmount: number;
  currency: string;
}

/**
 * Define las propiedades (Props) esperadas por el componente PaymentModule.
 */
interface PaymentModuleProps {
  order: IOrderPayload;
  onCancel?: () => void; 
}

// =================================================================
// 2. FUNCIÓN DE ESTILO SEPARADA (Para estilos condicionales)
// =================================================================

/**
 * Retorna el objeto de estilos para el botón de pago, ajustado según si está procesando.
 */
const getPayButtonStyle = (isProcessing: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '15px',
    backgroundColor: isProcessing ? '#007a4b' : '#00995c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: isProcessing ? 'not-allowed' : 'pointer',
    fontSize: '17px',
    fontWeight: '700',
    marginTop: '20px',
    transition: 'background-color 0.2s',
});

// =================================================================
// 3. COMPONENTE FUNCIONAL TIPADO
// =================================================================

const PaymentModule: React.FC<PaymentModuleProps> = ({ order }) => {
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const initialOrderData: IOrderPayload = order;

  if (!initialOrderData) {
    return <div>Error: No se recibió la información del pedido.</div>;
  }

  // --- Lógica de Manejo de Pago ---
  
  const handlePay = (): void => {
    setIsProcessing(true);
    
    // Simular un proceso de pago de 2 segundos
    setTimeout(() => {
      setIsProcessing(false);
      
      // Publicar evento de éxito al Host
      const successEvent = new CustomEvent('mf:end-checkout', {
        detail: { status: 'success', orderId: initialOrderData.orderId },
        bubbles: true,
        composed: true,
      });
      window.dispatchEvent(successEvent);
      
      alert(`✅ Pago exitoso para la orden ${initialOrderData.orderId}!`);
    }, 2000);
  };

  const handleCancel = (): void => {
    // Publicar evento de cancelación al Host
    const cancelEvent = new CustomEvent('mf:end-checkout', {
        detail: { status: 'cancelled', orderId: initialOrderData.orderId },
        bubbles: true,
        composed: true,
    });
    window.dispatchEvent(cancelEvent);
  };
  
  // --- Renderizado y Cálculos Tipados ---
  const formattedTotal: string = initialOrderData.totalAmount.toFixed(2);
  const totalItems: number = initialOrderData.items.reduce((sum: number, item: IOrderItem) => sum + item.quantity, 0);

  return (
    <div style={paymentStyles.page}>
      
      {/* Columna Principal: Formulario de Pago */}
      <div style={paymentStyles.paymentContainer}>
        <h2 style={paymentStyles.title}>Finalizar Pedido</h2>
        <p style={paymentStyles.subtitle}>Paga con tarjeta o elige otro método.</p>

        {/* Total a Pagar */}
        <div style={paymentStyles.totalBox}>
            <span style={paymentStyles.totalLabel}>Total a Pagar</span>
            <span style={paymentStyles.totalAmount}>${formattedTotal}</span>
        </div>

        {/* Formulario de Pago (Simulación) */}
        <div style={paymentStyles.formGroup}>
            <label style={paymentStyles.label}>Número de Tarjeta</label>
            <input type="text" placeholder="xxxx xxxx xxxx xxxx" style={paymentStyles.input as React.CSSProperties} disabled={isProcessing} />
        </div>
        <div style={paymentStyles.row}>
            <div style={paymentStyles.formGroupHalf}>
                <label style={paymentStyles.label}>Vencimiento (MM/AA)</label>
                <input type="text" placeholder="MM/AA" style={paymentStyles.input as React.CSSProperties} disabled={isProcessing} />
            </div>
            <div style={paymentStyles.formGroupHalf}>
                <label style={paymentStyles.label}>CVV</label>
                <input type="text" placeholder="123" style={paymentStyles.input as React.CSSProperties} disabled={isProcessing} />
            </div>
        </div>
        <div style={paymentStyles.formGroup}>
            <label style={paymentStyles.label}>Nombre en la Tarjeta</label>
            <input type="text" placeholder="Juan Pérez" style={paymentStyles.input as React.CSSProperties} disabled={isProcessing} />
        </div>

        {/* Botones de Acción */}
        <button 
            style={getPayButtonStyle(isProcessing)} 
            onClick={handlePay}
            disabled={isProcessing}
        >
            {isProcessing ? 'Procesando Pago...' : `Pagar $${formattedTotal}`}
        </button>
        <button 
            style={paymentStyles.cancelButton}
            onClick={handleCancel}
            disabled={isProcessing}
        >
            Cancelar y Volver
        </button>
      </div>

      {/* Columna Lateral: Resumen del Pedido */}
      <div style={paymentStyles.summaryContainer}>
          <h3 style={paymentStyles.summaryTitle}>Resumen del Pedido</h3>
          <p style={paymentStyles.summaryInfo}>Orden # {initialOrderData.orderId}</p>
          <p style={paymentStyles.summaryInfo}>Productos: {totalItems}</p>
          <div style={paymentStyles.summaryList}>
              {initialOrderData.items.map(item => (
                  <div key={item.id} style={paymentStyles.summaryItem}>
                      <span style={paymentStyles.summaryName}>{item.quantity}x {item.name}</span>
                      <span style={paymentStyles.summaryPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
              ))}
          </div>
          <div style={paymentStyles.summaryTotal}>
              <span>TOTAL</span>
              <span>${formattedTotal}</span>
          </div>
      </div>

    </div>
  );
};

// =================================================================
// 4. ESTILOS TIPADOS (Solo objetos CSS estáticos)
// =================================================================

// Define la interfaz para el objeto de estilos
interface IPaymentStyles {
    [key: string]: React.CSSProperties;
}

const paymentStyles: IPaymentStyles = {
  page: {
    display: 'flex',
    gap: '40px',
    maxWidth: '1200px',
    margin: '40px auto',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
  },
  paymentContainer: {
    flex: 2,
    padding: '30px',
    borderRight: '1px solid #f0f0f0',
  },
  summaryContainer: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    border: '1px solid #eee',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  totalBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#e6fff0',
    border: '1px solid #b3ffc7',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#005533',
  },
  totalAmount: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#005533',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formGroupHalf: {
    flex: 1,
  },
  row: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  } as React.CSSProperties, 
  cancelButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#999',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    marginTop: '10px',
  },
  summaryTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '20px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
  },
  summaryInfo: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  summaryList: {
    marginTop: '20px',
    marginBottom: '20px',
    borderTop: '1px solid #e0e0e0',
    paddingTop: '15px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '15px',
  },
  summaryName: {
    color: '#333',
  },
  summaryPrice: {
    fontWeight: '600',
    color: '#333',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '15px',
    fontSize: '20px',
    fontWeight: '700',
    borderTop: '2px solid #1a1a1a',
  }
};

export default PaymentModule;