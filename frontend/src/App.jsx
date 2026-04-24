import React, { useState, useEffect } from 'react';

export default function App() {
  const [healthStatus, setHealthStatus] = useState('Cargando...');

  useEffect(() => {
    fetch('/api/health')
      .then(response => response.json())
      .then(data => setHealthStatus(data.status));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>App de Estudio con IA</h1>
      <p>El frontend se ha inicializado correctamente con Vite y React.</p>
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <strong>Estado del Backend: </strong> {healthStatus}
      </div>
    </div>
  );
}
