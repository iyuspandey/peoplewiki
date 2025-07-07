// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Message from './components/mess';
import SendReceive from './components/SendReceive';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Message />} />
        <Route path="/send-receive" element={<SendReceive />} />
      </Routes>
  
  );
}

export default App;