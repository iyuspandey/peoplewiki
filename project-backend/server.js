const axios = require("axios");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const Person = require("./model/student");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ⚡ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*", // frontend dev port
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MongoDB URI is not defined");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// People API example
app.get("/api/people", async (req, res) => {
  try {
    const people = await Person.find();
    res.json({ data: people });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
const fileChunks = {}; // Object to store file chunks
// Real-time chat: socket connection
io.on("connection", (socket) => {
  const username = `root${Math.random().toFixed(3)}`;
  socket.username = username;
  console.log(`${username} connected`);

  // Send the username to the client
  socket.emit("username", username);

  // Broadcast incoming message
  socket.on("message", (data) => {
    // Emit the user's message to all clients
    io.emit("message", {
      username: socket.username,
      text: data.text,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} disconnected`);
  });
  socket.on("file-chunk", (data) => {
    const { filename, chunk, isLast } = data;

    // Initialize storage for the file if it doesn't exist
    if (!fileChunks[filename]) {
      fileChunks[filename] = [];
    }

    // Add the chunk to the file's storage
    fileChunks[filename].push(Buffer.from(new Uint8Array(chunk)));


    // If it's the last chunk, reconstruct the file
    if (isLast) {
      const fileBuffer = Buffer.concat(fileChunks[filename]);
      console.log(`Received complete file: ${filename} (${fileBuffer.length} bytes)`);

      // Optionally, broadcast the file metadata to all clients
      io.emit("file-chunk", {
        filename,
        chunk: fileBuffer,  // Full buffer here
        isLast: true
      });
      

      // Clean up the stored chunks
      delete fileChunks[filename];
    }
  });
});

server.listen(PORT,'0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
