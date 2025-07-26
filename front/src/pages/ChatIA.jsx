import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import axios from 'axios';
import { FiHome, FiBook, FiBarChart2, FiMessageSquare, FiAward, FiSettings, FiLogOut } from 'react-icons/fi';


function ChatIA() {
    return (
        <div className="chat-container">
            <h1>Chat with AI</h1>
            <div className="chat-box">
                <div className="messages"></div>
                <input type="text" placeholder="Type your message..." />
                <button>Send</button>
            </div>
        </div>
    );
    
}

export default ChatIA;