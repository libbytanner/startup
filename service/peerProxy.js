const { WebSocketServer } = require('ws');

function peerProxy(server) {
  const socketServer = new WebSocketServer({ server });
  console.log("WebSocket server started, waiting for connections...");

  socketServer.on('connection', (socket) => {
    console.log("new connection");
    socket.isAlive = true;

    socket.on('message', function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();
      
      client.isAlive = false;
      client.ping();
    });
  }, 15000)

}

module.exports = { peerProxy }


// How do I want this to work:
// Notified of new ratings
// Display ratings from database
// current users or nah? -- yes if gonna add commenting functionality. 