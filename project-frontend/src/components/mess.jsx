import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Header from "./Header";
import { Link } from 'react-router-dom';
import { Database, Users, UserCog, GraduationCap, Search } from 'lucide-react';

const socket = io("https://peoplewiki.onrender.com");

function Mess() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    socket.on("username", (serverUsername) => {
      setUsername(serverUsername);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("username");
      socket.off("message");
    };
  }, []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit("message", { text: input });
    setInput("");
  };

  return (
    
    <div className="h-screen bg-black text-green-400 font-mono p-4 flex flex-col items-center justify-start overflow-hidden">
        <div className="flex items-center mb-4 md:mb-0">
            <Database className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold terminal-text glow-text">
              <Link to="/" className="text-primary hover:text-primary/80">
              NIT Jalandhar <span className="text-gray-400">|</span> People Wiki
              </Link>
            </h1>
          </div>
      <h2 className="text-xl mb-2">Chat</h2>
      

      <div
        ref={chatContainerRef}
        className="bg-gray-900 p-4 border border-green-600 rounded mb-4 w-full max-w-2xl h-[60vh] overflow-y-auto flex flex-col justify-end"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.username === username ? "text-right" : "text-left"}`}
          >
            <span className="text-green-500">{msg.username}&gt;&gt;</span> {msg.text}
            <div className="text-xs text-gray-500">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex w-full max-w-2xl">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-gray-800 text-green-300 border border-green-600 px-2 py-1 rounded-l outline-none"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-1 rounded-r"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Mess;
