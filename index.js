const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { addUser, users } = require('./users');
const route = require('./route');

const app = express();

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
});

io.on('connection', (socket) => {
  socket.emit('users', users)

  socket.on('common', (data) => {
      if (!data) {
        return;
      }

      socket.join(data?.room);

      // console.log('data', data)
      
      const { user } = addUser(data)
      
      socket.emit('message', {
        user, message: `Добро пожаловать в "Живой чат", пользователь`
      })
      
      socket.broadcast.to(data?.room).emit('message', {
        user, message: `Присоединился новый пользователь`
      })
  })

  socket.on('addChat', (data) => {
    console.log('data', data)

    socket.emit('createRoom', data)
  })
});

io.on('disconnect', () => {
  console.log('Disconnect');
});

server.listen(5004, () => {
  console.log('Server is running')
});