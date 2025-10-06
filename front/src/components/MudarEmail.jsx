import axios from "axios";
import React, { useState } from "react";
import '../styles/mudarEmail.css';

function MudarEmail() {
    const [novoEmail, setNovoEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmailChange = (e) => setNovoEmail(e.target.value);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const token = localStorage.getItem("token");
            await axios.patch("https://api-tcc-senai2025.vercel.app/usuarios/email", { email: novoEmail }, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            alert("Email atualizado com sucesso!");
            setNovoEmail("");
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar email");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="email-changer-form" onSubmit={handleEmailSubmit}>
            <input
                type="email"
                value={novoEmail}
                onChange={handleEmailChange}
                placeholder="Digite seu novo email"
                required
            />
            <button type="submit" disabled={isSubmitting || !novoEmail.trim()}>
                {isSubmitting ? 'Atualizando...' : 'Atualizar Email'}
            </button>
        </form>
    );
}

export default MudarEmail;