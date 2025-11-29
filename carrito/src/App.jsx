import React from 'react';
import MiniCart from './components/MiniCart';

function App() {
  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <MiniCart />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  wrapper: {
    maxWidth: '420px',
    margin: '0 auto'
  }
};

export default App;