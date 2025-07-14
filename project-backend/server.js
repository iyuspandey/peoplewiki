const axios = require("axios");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const Person = require("./model/student");
const Discussion = require("./model/discussion");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://peoplewik.netlify.app",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
}));


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

// Routes
// Fetch all discussions
app.get("/api/discussions", async (req, res) => {
  try {
    const discussions = await Discussion.find({}, "id title createdAt messages");
    res.json(discussions);
  } catch (err) {
    console.error("❌ Error fetching discussions:", err);
    res.status(500).json({ error: "Failed to fetch discussions", detail: err.message });
  }
});
app.post("/api/discussions", async (req, res) => {
  const { id, title } = req.body;

  if (!id || !title) {
    return res.status(400).json({ error: "ID and title are required" });
  }

  try {
    const exists = await Discussion.findOne({ id });
    if (exists) {
      return res.status(400).json({ error: "Discussion already exists" });
    }

    const discussion = new Discussion({ id, title, messages: [] });
    await discussion.save();

    res.status(201).json(discussion);
  } catch (err) {
    console.error("❌ Error creating discussion:", err);
    res.status(500).json({ error: "Failed to create discussion", detail: err.message });
  }
});

// Get discussion by ID
app.get("/api/discussions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const discussion = await Discussion.findOne({ id });
    if (!discussion) return res.status(404).json({ error: "Discussion not found" });
    res.json(discussion);
  } catch (err) {
    console.error("❌ Error fetching discussion:", err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// Add message to discussion
app.post("/api/discussions/:id/message", async (req, res) => {
  const { id } = req.params;
  const { username, text, timestamp } = req.body;

  if (!username || !text || !timestamp) {
    return res.status(400).json({ error: "Invalid message data" });
  }

  try {
    const discussion = await Discussion.findOne({ id });
    if (!discussion) return res.status(404).json({ error: "Discussion not found" });

    discussion.messages.push({ username, text, timestamp });
    await discussion.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error adding message:", err);
    res.status(500).json({ error: "Failed to add message", detail: err.message });
  }
});

// People API example
app.get("/api/people", async (req, res) => {
  try {
    const people = await Person.find();
    res.json({ data: people });
  } catch (error) {
    console.error("❌ Error fetching people:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

// ⚡ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const fileChunks = {}; // Object to store file chunks

io.on("connection", (socket) => {
  const username = `root${Math.random().toFixed(3)}`;
  socket.username = username;
  console.log(`${username} connected`);

  // Send the username to the client
  socket.emit("username", username);

  // Broadcast incoming message
  socket.on("message", (data) => {
    io.emit("message", {
      username: socket.username,
      text: data.text,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // Handle file chunks
  socket.on("file-chunk", (data) => {
    const { filename, chunk, isLast } = data;

    if (!fileChunks[filename]) {
      fileChunks[filename] = [];
    }

    fileChunks[filename].push(Buffer.from(new Uint8Array(chunk)));

    if (isLast) {
      const fileBuffer = Buffer.concat(fileChunks[filename]);
      console.log(`Received complete file: ${filename} (${fileBuffer.length} bytes)`);

      io.emit("file-chunk", {
        filename,
        chunk: fileBuffer,
        isLast: true,
      });

      delete fileChunks[filename];
    }
  });

  // Handle discussion messages
  socket.on("discussion-message", ({ id, message }) => {
    // Just broadcast to other clients except sender
    socket.broadcast.emit("discussion-message", { id, message });
    // NO DB save here
  });
  

  socket.on("disconnect", () => {
    console.log(`${socket.username} disconnected`);
  });
});

// Start the server
server.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
