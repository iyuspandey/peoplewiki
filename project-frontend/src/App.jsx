// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Message from './components/mess';
import SendReceive from './components/SendReceive';
import DiscussionPage from './components/discusion';
import AllDiscussions from './components/Alldiscussion';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Message />} />
        <Route path="/send-receive" element={<SendReceive />} />
        <Route path="/discussions" element={<AllDiscussions />} />
        <Route path="/discussions/:id" element={<DiscussionPage/>} />
      </Routes>
  
  );
}

export default App;