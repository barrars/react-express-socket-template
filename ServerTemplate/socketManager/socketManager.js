// socketManager.js
const socketIo = require('socket.io')
let io

const init = (server) => {
  console.log('Initializing socket.io')
  io = socketIo(server, {
    cors: {
      origin: '*', // Adjust according to your needs
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log('New client connected')
    // Setup your socket event listeners here
  })

  return io // This might not be necessary depending on your setup
}

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}

module.exports = { init, getIO }
