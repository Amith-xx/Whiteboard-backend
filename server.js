
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Allow React frontend to connect
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// --- MAIN LOGIC (same as your Spring Boot controller) ---
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // 1. DRAW
  socket.on("draw", (stroke) => {
    io.emit("draw", stroke);  // broadcast stroke
  });

  // 2. COMMENT
  socket.on("comment", (comment) => {
    io.emit("comment", comment);
  });

  // 3. REACTION
  socket.on("reaction", (reaction) => {
    io.emit("reaction", reaction);
  });

  // 4. ERASE
  socket.on("erase", () => {
    io.emit("erase", "ERASE");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Backend running on port " + PORT);
});

