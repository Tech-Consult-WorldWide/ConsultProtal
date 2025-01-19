import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";

// Option 1: create a single socket outside (or inside with lazy init)
const socket = io(process.env.REACT_APP_SERVER_URL, {
  // if needed, pass options
});

const Chat = ({ conversationId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Join the chat "room" on mount
    socket.emit("joinChat", conversationId);

    // Listen for messages from server
    socket.on("chatMessage", (msg) => {
      // Only append if it matches the same conversationId (optional check)
      if (msg.conversationId === conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("chatMessage");
    };
  }, [conversationId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      conversationId,
      senderId: userId,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="chat">
      <h3>Chat</h3>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderId}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;