import { useState } from "react";
import axios from "axios";
import "../styles/chatbox.css"; // você pode criar depois

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "Você", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:3001/api/chat", {
        text: input,
      });

      setMessages([
        ...newMessages,
        { sender: "IA", text: res.data.response }
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-bubble ${m.sender === "Você" ? "user" : "ia"}`}
          >
            <strong>{m.sender}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}
