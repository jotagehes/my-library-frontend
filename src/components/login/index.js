import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css';
import instance from '../../axiosConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await instance.post('/api/seguranca/login', {
        email: username,
        senha: password,
      });
  
      const token = response.data.token;
      
      localStorage.setItem('jwtToken', token);
      navigate('/books');
    } catch (error) {
      console.error('Erro no login:', error.message);
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div className='login-card'>
        <h2>Login</h2>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <TextField style={{ margin: '10px 0'}} id="outlined-basic" label="Usuário" variant="outlined" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField style={{ margin: '10px 0'}} id="outlined-basic" label="Senha" variant="outlined" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
          <Button style={{ margin: '10px 0'}} variant="contained" color="primary" onClick={handleLogin}>Login</Button>
          
          <p style={{ marginTop: '10px' }}>Sem cadastro? <Link to="/register" style={{ color: '#1976D2', textDecoration: 'underline'}}>Crie agora</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
