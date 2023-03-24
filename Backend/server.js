const socketIO = require("socket.io");
const http = require("http");
const begriffRepository = require("./repositories/begriff");

function createSocketServer(joinCode, umfrageID) {
  const server = http.createServer();
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:8081",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join", (data) => {
      if (data === joinCode) {
        socket.join(joinCode);
        console.log(`user joined room ${joinCode}`);
        io.to(joinCode).emit("user joined");
      } else {
        console.log("invalid join code");
        socket.emit("invalidJoinCode");
      }
    });

    socket.on("chat message", (msg) => {
      console.log(`Message received from ${socket.id}: ${msg}`);
      io.to(msg.room).emit("chat message", msg);
      begriffRepository.insertBegriff(msg, umfrageID, (begriff, error) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(`Begriff erfolgreich eingefügt: `+ begriff);
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return { io, server };
}

module.exports = createSocketServer;
