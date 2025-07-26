import React, { useState } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        senha
      });

      alert('Login bem-sucedido!');
      localStorage.setItem('token', response.data.token); // salvar token
      navigate('/dashboard'); // redirecionar para o dashboard
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="button" onClick={() => window.location.href = '/register'}>
          Registrar
        </button>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
