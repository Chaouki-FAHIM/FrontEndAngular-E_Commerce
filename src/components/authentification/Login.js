import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Role from '../../model/Role';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7777';

const ERROR_MESSAGES = {
  invalidCredentials: 'Email and password Invalid',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError(ERROR_MESSAGES.invalidCredentials);
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    setError('');
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    axios.post(`${API_URL}/login`, {
          email: email,
          passwd: password,
        })
        .then((response) => {
          const userData = response.data;

          console.log(userData);
          localStorage.setItem('userId', userData.id);

          switch (userData.role) {
              case Role.ADMIN:
                  navigate('/admin-home');
                  break;
              case Role.CUSTOMER:
                  navigate('/customer-home');
                  break;
              default:
                  setError("Role ne défini");
                  break;
          }

        })
        .catch((error) => {
          console.error('Error during login:', error);
          setError(ERROR_MESSAGES.invalidCredentials);
        })
        .finally(() => {
          setIsLoading(false);
        });
  };

  return (
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>Connexion</h2>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Email:</label>
          <input style={{ width: '100%', padding: '12px', fontSize: '16px', lineHeight: '1.5', border: '1px solid #ccc', borderRadius: '5px' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px' }}>Mot de passe:</label>
          <input style={{ width: '100%', padding: '12px', fontSize: '16px', lineHeight: '1.5', border: '1px solid #ccc', borderRadius: '5px' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red', fontSize: '16px', marginBottom: '10px' }}>{error}</div>}
        <button style={{ width: '100%', padding: '10px', fontSize: '18px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%', padding: '10px', fontSize: '18px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              S'inscrire
            </button>
          </Link>
        </div>
      </div>
  );
}
