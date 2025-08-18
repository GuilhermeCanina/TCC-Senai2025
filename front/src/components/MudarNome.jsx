import axios from "axios";
import React, { useState } from "react";

function MudarNome() {
    const [novoNome, setNovoNome] = useState("");

    const handleNomeChange = (e) => setNovoNome(e.target.value);

    const handleNomeSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.patch("http://localhost:3001/usuarios/nome", { nome: novoNome }, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            alert("Nome atualizado com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar nome");
        }
    };

    return (
        <form onSubmit={handleNomeSubmit}>
            <input type="text" value={novoNome} onChange={handleNomeChange} />
            <button type="submit">Atualizar Nome</button>
        </form>
    );
}

export default MudarNome;