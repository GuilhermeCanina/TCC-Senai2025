import React from "react";
import axios from "axios";

export default function ExcluirConta() {
    const handleDeleteAccount = async () => {
        const token = localStorage.getItem("token");
    
        try {
        await axios.delete("https://api-tcc-senai2025.vercel.app/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("token");
        alert("Conta excluída com sucesso.");
        window.location.href = "/login";
        } catch (error) {
        console.error("Erro ao excluir conta:", error);
        alert("Ocorreu um erro ao tentar excluir sua conta.");
        }
    };
    
        return (
        <div className="danger-zone-container">
        <h2>Excluir Conta</h2>
        <button onClick={handleDeleteAccount} className="btn btn-danger">
            Excluir Conta
            </button>
        </div>
    );

    }