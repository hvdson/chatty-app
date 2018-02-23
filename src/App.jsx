import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const RandomId = require('./RandomId.js');
// const WebSocket = require('ws');

const newColour = function colour() {

  function getRandomIntInclusive(max) {
    const min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  const hexVals = ['#f0afdd', '#e3b67e', '#b5f69b', '#94eed5', 'purple'];
  return hexVals[(getRandomIntInclusive(hexVals.length - 1))];
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersOnline: '0',
      user: 'Shrek',
      messages: [],
      colour: newColour()
    };
  }


  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // Guaranteed that DOM elem exists on the page
  componentDidMount() {
    // don't need to require - b/c browser has already
    this.socket = new WebSocket('ws://localhost:3001');

    // Similar to wss.on('connection')
    // wait till connection
    this.socket.onopen = (event) => {
      // sends JSON to the ws-server
      const eventData = JSON.parse(event.data)
      const usersOnline = eventData.usersOnline;
      console.log("Client: ", event);
      console.log('Connected to ws-server');
      // this.socket.send(JSON.stringify(this.state));
    }

    // geting the data back from newMessage
    this.socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      // console.log(eventData);

      if (eventData.hasOwnProperty('usersOnline')) {
        // console.log(eventData);

        const usersOnline = eventData.usersOnline
        console.log(usersOnline);
        this.setState({
          usersOnline: usersOnline
        });

      } else {
        const newMessages = this.state.messages.concat(eventData);
        this.setState({
          messages: newMessages,
        });
      }
    }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 'blahblah-test-id', type: 'user', user: 'SmarterChild', text: 'I am the master chatbot', colour: 'red' };
      const messages = this.state.messages.concat(newMessage)

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 300);
  }

  newMessage(messageText){
    // const newId = RandomId();
    console.log(this.state.colour);

    const newMessageObj = {
      type: 'user',
      text: messageText,
      user: this.state.user,
      colour: this.state.colour
    }

    // will recieve the data back through this.socket.onmessage
    this.socket.send(JSON.stringify(newMessageObj));
  }

  // helper function for setUsername 
  // updates the current state with a new messsage appended
  newSystemMessage(newUsername) {

    // system message logic is handled by MessageList component
    // don't need user property
    const newSystemMessageObj = {
      type: 'system',
      text: `${this.state.user} changed their name to ${newUsername}`
    }
    
    this.socket.send(JSON.stringify(newSystemMessageObj));
    // need to pass to newMessage to send to server    
  }

  // similar to setUsername but will broadcast a system message
  setUsername(user) {
    this.newSystemMessage(user);
    this.setState({
      user: user
    });
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <Navbar usersOnline={this.state.usersOnline}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.user} setUsername={this.setUsername.bind(this)} newMessage={this.newMessage.bind(this)}/>
      </div>
    ); 
  }
}
export default App;