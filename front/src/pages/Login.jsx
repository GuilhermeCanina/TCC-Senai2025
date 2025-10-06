import React, { useState } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api-tcc-senai2025.vercel.app/login', { email, senha });

      alert('Login bem-sucedido!');

      localStorage.setItem('token', response.data.token);

      const decoded = jwt_decode(response.data.token);
      localStorage.setItem(
        'usuario',
        JSON.stringify({ id: decoded.id, email: decoded.email })
      );

      console.log('Usuário logado:', decoded); 
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Erro no login:', err);
      alert('Erro ao fazer login. Verifique email e senha.');
    }
  };

  return (
    <div className="login-container">
      <h2>SynapLearn</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <div className="botoes">
          <button
            type="button"
            onClick={() => window.location.href = '/register'}
          >
            Registrar
          </button>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
