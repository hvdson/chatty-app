const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuid = require('uuid');

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

// const messageDatabase = [];
// let numberOfmessages = 0;

// database of messages in memory
class Messages {
  constructor() {
    this._messagesList = [];
    this.saveMessage = this.saveMessage.bind(this);
  }
  saveMessage(message) {
    this._messagesList.push(message);
  }
  get allMessages(){
    return this._messagesList;
  }
}

class Users {
  constructor() {
    this._userCount = 0;
  }
  addUserCount() {
    this._userCount++;
  }
  subtractUserCount() {
    this._userCount--;
  }
  get userCount() {
    return this._userCount;
  }
}

const messages = new Messages();
const users = new Users();

// Broadcast to all clients
wss.broadcast = (data) => {
  wss.clients.forEach( (client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


// when a new client connects
wss.on('connection', (ws) => {
  const usersOnline = {};
  ws.isAlive = true;
  users.addUserCount();
  usersOnline.usersOnline = users.userCount;  
  console.log("in server " + usersOnline);

  wss.broadcast(JSON.stringify(usersOnline));

  console.log(messages.allMessages);
  wss.broadcast(JSON.stringify(messages.allMessages));

  // ws.on('pong', () => {
  //   ws.isAlive = true;
  // })

  ws.on('error', (err) => console.log(err));
  ws.on('message', (data) => {
    // on connection and first message of new socket
    const newMessage = JSON.parse(data);
    newMessage.id = uuid();

    // TODO: stores messages and displays to newly connected socket
    messages.saveMessage(newMessage);

    // added usersOnline as a key to data being broadcasted
    wss.broadcast(JSON.stringify(newMessage));
  });

  ws.on('close', () => {
    ws.isAlive = false;
    users.subtractUserCount();
    console.log('disconnected');
    console.log("number of users connected: " + users.userCount);
  });

});
