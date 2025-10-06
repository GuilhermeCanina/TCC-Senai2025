import axios from "axios";
import React, { useState } from "react";
import '../styles/mudarNome.css';

function MudarNome() {
    const [novoNome, setNovoNome] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNomeChange = (e) => setNovoNome(e.target.value);

    const handleNomeSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const token = localStorage.getItem("token");
            await axios.patch("https://api-tcc-senai2025.vercel.app/usuarios/nome", { nome: novoNome }, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            alert("Nome atualizado com sucesso!");
            setNovoNome("");
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar nome");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="name-changer-form" onSubmit={handleNomeSubmit}>
            <input 
                type="text" 
                value={novoNome} 
                onChange={handleNomeChange} 
                placeholder="Digite seu novo nome"
                required
            />
            <button type="submit" disabled={isSubmitting || !novoNome.trim()}>
                {isSubmitting ? 'Atualizando...' : 'Atualizar Nome'}
            </button>
        </form>
    );
}

export default MudarNome;