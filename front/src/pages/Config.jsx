import React, { useState } from 'react';
import axios from 'axios';

function AvatarUploader({ currentAvatar, userInitial }) {
  const [preview, setPreview] = useState(currentAvatar || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // mostra pré-visualização
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const file = e.target.avatar.files[0];
    if (!file) return alert("Selecione uma imagem!");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:3001/user/avatar", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Avatar atualizado com sucesso!");
      setPreview(res.data.avatarUrl);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar imagem");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="user-avatar" style={{ marginBottom: "10px" }}>
        {preview ? (
          <img src={preview} alt="avatar" style={{ width: 80, height: 80, borderRadius: "50%" }} />
        ) : (
          <div className="user-initial">{userInitial}</div>
        )}
      </div>

      <form onSubmit={handleUpload}>
        <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default AvatarUploader;
