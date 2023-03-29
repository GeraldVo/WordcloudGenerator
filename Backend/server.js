const socketIO = require("socket.io");
const http = require("http");
const begriffRepository = require("./repositories/begriff");
const blacklistRepository = require("./repositories/blacklist");

function createSocketServer(joinCode, umfrageID) {
  const server = http.createServer();

  const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: "GET,POST"
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);


    socket.on("join", (data) => {
      console.log("Join Code: " + data);
      if (data === joinCode) {
        socket.join(joinCode);
        console.log(`user joined room ${joinCode}`);
        io.to(joinCode).emit("joined");
        socket.emit("join");
      } else {
        console.log("invalid join code");
        socket.emit("invalidJoinCode");
        socket.disconnect();
      }
    });


    socket.on("chat message", (msg) => {
      console.log(`Message received from ${socket.id}: ${msg}`);
      io.to(msg.room).emit("chat message", msg);
      
      blacklistRepository.getBlacklistBegriffByName(msg, (begriffe, error) => {
        if (error) {
          console.error(error);
          return;
        }
        if (begriffe.length > 0) {
          // The begriff already exists, so return it
          return;
        }
        begriffRepository.insertBegriff(msg, umfrageID, (begriff, error) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`Begriff erfolgreich eingefügt: ` + begriff);
        });

      });


    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return { io, server };
}

module.exports = createSocketServer;
