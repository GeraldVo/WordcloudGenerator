const socketio = require('socket.io');

const io = socketio();

const rooms = {};

io.on('connection', (socket) => {
  // Handle join room event
  socket.on('join', (room) => {
    // Check if room exists
    if (!rooms[room]) {
      rooms[room] = [];
    }

    // Add socket to room
    rooms[room].push(socket);

    // Join socket to room
    socket.join(room);

    // Emit a welcome message to the socket
    socket.emit('message', `Welcome to room ${room}!`);

    // Emit a new user joined message to the room
    socket.to(room).emit('message', `${socket.id} has joined the room.`);
  });

  // Handle chat message event
  socket.on('chat', (room, message) => {
    // Emit the message to all sockets in the room
    io.to(room).emit('message', `${socket.id}: ${message}`);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    // Remove socket from all rooms
    for (const room in rooms) {
      if (rooms[room].includes(socket)) {
        rooms[room].splice(rooms[room].indexOf(socket), 1);

        // Emit a user left message to the room
        socket.to(room).emit('message', `${socket.id} has left the room.`);
      }
    }
  });
});

module.exports = io;