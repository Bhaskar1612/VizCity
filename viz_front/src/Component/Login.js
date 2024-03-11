import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'

const Login = ({ setAccessToken }) => {
  const [grant_type, setGrantType]= useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [client_id, setClientID]= useState('');
  const [client_secret, setClientSecret]= useState('');
  const [scope, setScope]= useState('');

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('grant_type', grant_type);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('scope', scope);
    formData.append('client_id', client_id);
    formData.append('client_secret', client_secret);
    
    try {
      const response = await axios.post('http://localhost:8000/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      });

      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error during login:', error);
      console.log('Response from server:', error.response.data)
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <div className="input-container">
        <label>Grant Type:</label>
        <input type="text" value={grant_type} onChange={(e) => setGrantType(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Scope:</label>
        <input type="text" value={scope} onChange={(e) => setScope(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Client ID:</label>
        <input type="text" value={client_id} onChange={(e) => setClientID(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Client Secret:</label>
        <input type="text" value={client_secret} onChange={(e) => setClientSecret(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
