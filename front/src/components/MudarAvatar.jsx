import React, { useState } from "react";
import axios from "axios";
import '../styles/avatarUploader.css';

function AvatarUploader({ currentAvatar, userInitial }) {
  const [preview, setPreview] = useState(currentAvatar || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const file = e.target.avatar.files[0];
    if (!file) {
      alert("Selecione uma imagem!");
      setIsUploading(false);
      return;
    }

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
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="avatar-uploader-container">
      <div className="user-avatar">
        {preview ? (
          <img src={preview} alt="avatar" />
        ) : (
          <div className="user-initial">{userInitial}</div>
        )}
      </div>

      <form className="avatar-uploader-form" onSubmit={handleUpload}>
        <label htmlFor="avatar-upload" className="file-input-label">
          Escolher Imagem
        </label>
        <input 
          id="avatar-upload" 
          type="file" 
          name="avatar" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Enviando...' : 'Enviar Avatar'}
        </button>
      </form>
    </div>
  );
}

export default AvatarUploader;