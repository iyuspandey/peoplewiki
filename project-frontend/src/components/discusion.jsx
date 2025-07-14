import React, { useState, useEffect, useRef } from "react";
import { UserCircle } from "lucide-react";
import io from "socket.io-client";
import axios from "axios";
import { useLocation } from "react-router-dom";


const socket = io("https://peoplewiki.onrender.com"); // your backend address

function formatTimeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(dateStr).toLocaleString();
}

export default function DiscussionThread() {
    const threadId = window.location.pathname.split("/").pop(); // Get thread ID from URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const threadRef = useRef(null);
  const location = useLocation();
const [title, setTitle] = useState(location.state?.title || "Discussion Thread");
useEffect(() => {
    if (!title) {
      axios.get(`https://peoplewiki.onrender.com/api/discussions/${threadId}`)
        .then(res => setTitle(res.data.title))
        .catch(err => console.error("Error fetching title:", err));
    }
  }, [title, threadId])
  useEffect(() => {
    // Scroll to bottom on new message
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Fetch username from socket
    socket.on("username", (uname) => setUsername(uname));

    // Fetch old messages
    axios.get(`https://peoplewiki.onrender.com/api/discussions/${threadId}`)
      .then(res => setMessages(res.data.messages))
      .catch(err => console.error("Error fetching messages:", err));

    // Listen for incoming messages
    socket.on("discussion-message", ({ id, message }) => {
      if (id === threadId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("discussion-message");
    };
  }, [threadId]);

  const handlePost = async () => {
    if (!input.trim()) return;
  
    const message = {
      username,
      text: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, message]);
  
    setInput("");  // clear input immediately
  
    try {
      // Save to DB via REST API
      await axios.post(`https://peoplewiki.onrender.com/api/discussions/${threadId}/message`, {
        username: message.username,
        text: message.text,
        timestamp: message.timestamp,
      });
  
      // Emit to others to broadcast
      socket.emit("discussion-message", {
        id: threadId,
        message,
      });
  
      // Do NOT setMessages locally here
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };
  
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-green-400 font-mono p-4 overflow-hidden flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center">📌 {title}</h2>
  
      {/* Scrollable container */}
      <div ref={threadRef} className="relative flex-1 overflow-y-auto px-10">
        
        {/* Relative wrapper so the vertical line grows with content */}
        <div className="relative w-full">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-700 opacity-60"></div>
  
          {/* Messages */}
          <div className="space-y-10 pl-12">
            {messages.map((msg, idx) => (
              <div key={idx} className="relative flex flex-col">
                {/* Dot on the line */}
                <div className="absolute -left-7 top-1.5">
                  <div className="w-4 h-4 rounded-full ring-2 ring-green-400 bg-green-500 shadow-lg"></div>
                </div>
  
                {/* Message content */}
                <div className="text-green-300">
                  <div className="flex items-center text-sm mb-1 text-green-500">
                    <UserCircle className="w-4 h-4 mr-1" />
                    {msg.username}
                    <span className="ml-4 text-xs text-gray-500">
                      {formatTimeAgo(msg.timestamp)}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Input */}
      <div className="w-full mt-4 px-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message and press Enter..."
          className="w-full bg-black border border-green-600 text-green-300 p-2 rounded outline-none"
        />
      </div>
    </div>
  );
  
}
