const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


// Broadcast to all clients
wss.broadcast = (data) => {
  wss.clients.forEach( (client) => {
    console.log("sending data to all clients")
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


// when a new client connects
// ws is a client (socket)
// need to add new uuid to the newMessage
wss.on('connection', (ws) => {
  ws.on('error', (err) => console.log(err));
  ws.on('message', (data) => {
    console.log(`Received the client data:`, data);
    // Broadcast to everyone else.
    wss.broadcast(data);
  });

  ws.on('close', () => {
    console.log('disconnected');
  });

});
