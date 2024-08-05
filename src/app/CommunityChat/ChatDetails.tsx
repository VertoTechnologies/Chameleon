'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

interface Chat {
  _id: string;
  language: string;
  groupPhoto: string;
  users: string[];
}

interface Message {
  _id: string;
  text: string;
  sender: {
    name: string;
  };
  createdAt: string;
}

const ChatDetails: React.FC<{ chat: Chat; userId: string }> = ({ chat, userId }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const chatId = chat._id

  useEffect(() => {
    const socket = io({
      path: '/api/socket',
    });

    setSocket(socket);

    socket.emit('joinRoom', chatId);

    socket.on('previousMessages', (previousMessages) => {
      console.log('Previous messages received:', previousMessages);
      setMessages(previousMessages);
    });

    socket.on('receiveMessage', (message) => {
      console.log('New message received:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      setError(error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [chat._id]);

  const sendMessage = async () => {
    if (!text) return;

    try {
      const response = await axios.post('/api/groups/groupMessage', {
        chatId: chat._id,
        userId,
        text,
      });
      setText('');
      const newMessage = response.data;
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', { ...newMessage, chatId: chat._id, userId });
    } catch (err) {
      setError((err as Error).message || 'An error occurred while sending the message.');
    }
  };

  return (
    <div>
      <h2>Chat Details</h2>
      <p>Language: {chat.language}</p>
      <p>Users: {chat.users.join(', ')}</p>
      <div>
        <input
          type="text"
          placeholder="Write a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      {error && <p>Error: {error}</p>}
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className="message">
            <p><strong>{message.sender.name}</strong>: {message.text}</p>
            <p><small>{new Date(message.createdAt).toLocaleString()}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatDetails;
