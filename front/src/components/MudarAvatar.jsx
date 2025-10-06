import React, { useState } from "react";
import axios from "axios";
import '../styles/AvatarUploader.css';

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
    const file = document.getElementById("avatar-upload").files[0];
    if (!file) {
      alert("Selecione uma imagem!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "avatar_preset"); 

    try {
      const resCloud = await fetch(
        "https://api.cloudinary.com/v1_1/dzhxoyy6j/image/upload",
        { method: "POST", body: formData }
      );
      const data = await resCloud.json();
      const cloudUrl = data.secure_url;

      setPreview(cloudUrl);

      const token = localStorage.getItem("token");
      await axios.put(
        "https://api-tcc-senai2025.vercel.app/user/avatar",
        { avatarUrl: cloudUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Avatar atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar avatar");
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
