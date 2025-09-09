const axios = require("axios");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
const allowedOrigins = [
  "https://peoplewiki.netlify.app",
  "https://peoplewik.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api", require("./route/route"));

const PORT = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("MongoDB URI is not defined");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import socket setup
require("./socket/socket")(server, allowedOrigins);

// Start the server
server.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);






