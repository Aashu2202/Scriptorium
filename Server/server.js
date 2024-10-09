const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bodyP = require('body-parser');
require('dotenv').config()

// Initialize Express app
const app = express();

// Middleware
app.use(bodyP.json());

// CORS settings (allow only the frontend's deployed URL)
const allowedOrigins = [process.env.FRONTEND_URL_ENDPOINT];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true,  // if you're using cookies for session handling
}));

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST']
  }
});

// Routes
const codeRoutes = require('./routes/codeRoutes');
const { log } = require('console');
app.use('/api', codeRoutes);

// Socket.io logic
const listOfUser = {};

function allUsers(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
    socketId,
    username: listOfUser[socketId],
  }));
}

io.on('connection', (socket) => {
  console.log('User is connected', socket.id);

  socket.on('join', ({ roomId, username }) => {
    listOfUser[socket.id] = username;
    socket.join(roomId);
    const users = allUsers(roomId);
    users.forEach(({ socketId }) => {
      io.to(socketId).emit('joined', {
        users,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on('code-change', ({ roomId, myCode }) => {
    socket.in(roomId).emit('code-change', { myCode });
  });

  socket.on('sync-code', ({ socketId, myCode }) => {
    io.to(socketId).emit('code-change', { myCode });
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit('disconnected', {
        socketId: socket.id,
        username: listOfUser[socket.id],
      });
    });
    delete listOfUser[socket.id];
    socket.leave();
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
