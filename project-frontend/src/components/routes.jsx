// routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Mess from "./mess";
import App from "../App";
import SendReceive from "./SendReceive";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/chat" element={<Mess/>} />
      <Route path="/send-receive"element={<SendReceive/>} />
    </Routes>
  );
}

export default AppRoutes;
