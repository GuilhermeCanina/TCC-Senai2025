import React, { useState } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Versão 3 do jwt-decode

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { email, senha });

      alert('Login bem-sucedido!');

      // Salva o token
      localStorage.setItem('token', response.data.token);

      // Decodifica o token e salva o usuário
      const decoded = jwt_decode(response.data.token);
      localStorage.setItem(
        'usuario',
        JSON.stringify({ id: decoded.id, email: decoded.email })
      );

      console.log('Usuário logado:', decoded); // Mostra id e email no console
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Erro no login:', err);
      alert('Erro ao fazer login. Verifique email e senha.');
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
