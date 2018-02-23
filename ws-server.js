const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuid = require('uuid');
const request = require('request');
const GIPHY_API_KEY = '&api_key=a44NKEyEkE4NZuW8p1632zptW65o6nvD';
const GIPHY_URL = 'http://api.giphy.com/v1/gifs/search?q=' // need to insert query between this and apikey
// const API_URL = 


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

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

// to count number of users
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
  console.log("New client connected to websocket server! Number of users online: " + usersOnline.usersOnline);

  wss.broadcast(JSON.stringify(usersOnline));

  // gives newly connected client the message history
  wss.broadcast(JSON.stringify(messages.allMessages));

  ws.on('error', (err) => console.log(err));

  // going to be handling giphy command in here
  ws.on('message', (data) => {

    // on connection and first message of new socket
    const newMessage = JSON.parse(data);

    // TODO: Parses through the data to get the giphy command 
    let parts = newMessage.text.split(' ');
    newMessage.id = uuid();

    switch(parts[0]) {
      case '/giphy': {
        const searchQuery = parts.slice(1).join('-');
        const giphyRequest = GIPHY_URL + searchQuery + GIPHY_API_KEY;
        
        // todo: get the data from the api using searchQuery

        request(giphyRequest, (err, res, body) => {
          const giphy = JSON.parse(body);
          const gif = giphy.data[0].images.fixed_height.webp;
          // parts[0] = gif;
          newMessage.imgSrc = gif;
          console.log(giphy);
          newMessage.text = parts.slice(1).join(' ');
          
          console.log(newMessage);
          
          messages.saveMessage(newMessage);
          wss.broadcast(JSON.stringify(newMessage))
          
        });
        break;
      } default: {
        messages.saveMessage(newMessage);
        wss.broadcast(JSON.stringify(newMessage));
        break;
      }
    }
  });

  ws.on('close', () => {
    ws.isAlive = false;
    users.subtractUserCount();
    console.log('disconnected');
    console.log("number of users connected: " + users.userCount);
  });

});
