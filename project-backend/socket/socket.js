// socket.js
const { Server } = require("socket.io");
const axios=require("axios");
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
            const response = await axios.post(
              "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
              {
                contents: [
                  {
                    parts: [{ text: message.text }],
                  },
                ],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-goog-api-key": process.env.GEMINI_API_KEY, // keep your key safe
                },
              }
            );
      
            const botReply = {
              username: "AI Bot 🤖",
              text: response.data.candidates?.[0]?.content?.parts?.[0]?.text || "🤖 (no reply)",
              timestamp: new Date().toISOString(),
            };
      
            // Emit reply to everyone
            io.emit("discussion-message", { id, message: botReply });
          } catch (err) {
            console.error("Bot reply failed:", err.response?.data || err.message);
          }
        }
      });

    socket.on("disconnect", () => {
      console.log(`${socket.username} disconnected`);
    });
  });
};
