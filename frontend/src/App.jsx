import React, { useState, useEffect } from 'react';

export default function App() {
  const [healthStatus, setHealthStatus] = useState('Cargando...');
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Error al cargar usuarios');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetch('/api/health')
      .then(response => response.json())
      .then(data => setHealthStatus(data.status))
      .catch(() => setHealthStatus('Desconectado'));
    
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear usuario');
      }
      
      setEmail('');
      setName('');
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    setError(null);
    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      padding: '3rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #0f172a; margin: 0; }
        .glass-panel {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          margin-bottom: 2rem;
        }
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          transition: transform 0.2s, opacity 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        .btn-delete {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.5);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-delete:hover {
          background: #ef4444;
          color: white;
        }
        .user-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.2s;
        }
        .user-card:hover {
          transform: translateX(5px);
          background: rgba(255, 255, 255, 0.05);
        }
        .header-gradient {
          background: linear-gradient(135deg, #60a5fa, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: rgba(34, 197, 94, 0.2);
          color: #4ade80;
          font-size: 0.875rem;
          border: 1px solid rgba(34, 197, 94, 0.5);
        }
      `}</style>

      <div className="glass-panel" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="header-gradient" style={{ fontSize: '2.5rem' }}>App de Estudio IA</h1>
        <div style={{ marginTop: '1rem' }}>
          Backend Status: <span className="status-badge">{healthStatus}</span>
        </div>
      </div>

      <div className="glass-panel">
        <h2 style={{ marginBottom: '1.5rem', fontWeight: 500 }}>Nuevo Usuario</h2>
        {error && <div style={{ color: '#f87171', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>{error}</div>}
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Nombre completo"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Registrar Usuario</button>
        </form>
      </div>

      <div className="glass-panel">
        <h2 style={{ marginBottom: '1.5rem', fontWeight: 500 }}>Usuarios Registrados ({users.length})</h2>
        {users.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center' }}>No hay usuarios registrados aún.</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="user-card">
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{user.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{user.email}</p>
              </div>
              <button 
                onClick={() => handleDeleteUser(user.id)}
                className="btn-delete"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
