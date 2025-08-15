import React from "react";
import { useState } from "react";
import '../styles/register.css';
import axios from "axios";

function register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault ();
        try {
            const response = await axios.post('http://localhost:3001/usuarios', {
                nome,
                email,
                senha
            });
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
        }
    };

    return (
        <div className="register-container">
            <h2>Cadastro</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default register;