// socket.js
const { AzureOpenAI } =require("openai");
const apiVersion = "2024-04-01-preview";
const endpoint = "https://dhruv-mceuub4o-eastus2.cognitiveservices.azure.com/";
const modelName = "gpt-5-chat";
const deployment = "gpt-5-chat";
const { Server } = require("socket.io");
const axios=require("axios");
const dotenv = require("dotenv");
dotenv.config();
const apiKey = process.env.API_KEY;
const options = { endpoint, apiKey, deployment, apiVersion }
const client = new AzureOpenAI(options);
module.exports = function setupSocket(server, allowedOrigins) {
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  const fileChunks = {};

  io.on("connection", (socket) => {
    const username = `root${Math.random().toFixed(3)}`;
    socket.username = username;
    console.log(`${username} connected`);

    // Send username
    socket.emit("username", username);
    socket.on("get-username", () => {
      socket.emit("username", socket.username);
    });

    // Chat message
    socket.on("message", (data) => {
      io.emit("message", {
        username: socket.username,
        text: data.text,
        timestamp: new Date().toLocaleTimeString(),
      });
    });

    // File transfer
    socket.on("file-chunk", (data) => {
      const { filename, chunk, isLast } = data;

      if (!fileChunks[filename]) {
        fileChunks[filename] = [];
      }
      fileChunks[filename].push(Buffer.from(new Uint8Array(chunk)));

      if (isLast) {
        const fileBuffer = Buffer.concat(fileChunks[filename]);
        console.log(
          `Received complete file: ${filename} (${fileBuffer.length} bytes)`
        );

        io.emit("file-chunk", {
          filename,
          chunk: fileBuffer,
          isLast: true,
        });

        delete fileChunks[filename];
      }
    });

    // Discussion messages
    socket.on("discussion-message", async ({ id, message }) => {
        // Broadcast to others
        socket.broadcast.emit("discussion-message", { id, message });
      
        // Check if bot is tagged
        if (message.text.includes("@bot")) {
      try {
        const response = await client.chat.completions.create({
          messages: [
            { role: "system", content: "You are a helpful bot which replies to user messages in friendly way not like a gpt but as a friend" },
            { role: "user", content: message.text },
          ],
          max_tokens: 512,
          temperature: 1,
          top_p: 1,
          model: modelName,
        });

        const replyText =
          response.choices?.[0]?.message?.content || "🤖 (no reply)";

        const botReply = {
          username: "AI Bot 🤖",
          text: replyText,
          timestamp: new Date().toISOString(),
        };

        io.emit("discussion-message", { id, message: botReply });
      } catch (err) {
        console.error(
          "Bot reply failed:",
          err.response?.data || err.message || err
        );
      }
    }
      });

    socket.on("disconnect", () => {
      console.log(`${socket.username} disconnected`);
    });
  });
};