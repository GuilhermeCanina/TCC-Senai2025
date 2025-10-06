import React, { useState } from "react";
import "../styles/register.css";
import axios from "axios";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api-tcc-senai2025.vercel.app/usuarios", {
        nome,
        email,
        senha,
      });
      alert("Usuário registrado com sucesso!");
        window.location.href = "/login";
    } catch (error) {
      alert("Erro ao registrar usuário. Tente novamente.");
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
        <button
          type="button"
          onClick={() => (window.location.href = "/login")}
        >
          Já tenho uma conta
        </button>
      </form>
    </div>
  );
}

export default Register;
