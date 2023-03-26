const socketIO = require("socket.io");
const http = require("http");
const begriffRepository = require("./repositories/begriff");

function createSocketServer(joinCode, umfrageID) {
  const server = http.createServer();
  const io = require("socket.io")(server, {
    cors: {
      origin: "https://localhost:8080",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    },
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "*", //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

  io.origins((origin, callback) => {
    if (origin !== 'https://localhost:8080') {
        return callback('origin not allowed', false);
    }
    callback(null, true);
  });
  io.set('origins', '*:*');

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join", (data) => {
      console.log("Join Code: " + data);
      if (data === joinCode) {
        socket.join(joinCode);
        console.log(`user joined room ${joinCode}`);
        io.to(joinCode).emit("user joined");
      } else {
        console.log("invalid join code");
        socket.emit("invalidJoinCode");
        socket.disconnect();
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
        console.log(`Begriff erfolgreich eingefügt: ` + begriff);
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return { io, server };
}

module.exports = createSocketServer;
