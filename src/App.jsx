import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const RandomHexColor = require('random-hex-color');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersOnline: '0',
      user: 'Anon',
      messages: [],
      colour: RandomHexColor()
    };
  }

  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // Guaranteed that DOM elem exists on the page
  componentDidMount() {
    // don't need to require - b/c browser has already
    this.socket = new WebSocket('ws://localhost:3001');

    // wait till connection
    this.socket.onopen = (event) => {
      // sends JSON to the ws-server
      const eventData = JSON.parse(event.data);
      const usersOnline = eventData.usersOnline;
      console.log("Client: ", event);
      console.log('Connected to ws-server');
    }

    // geting the data back from newMessage
    this.socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);

      if (eventData.hasOwnProperty('usersOnline')) {

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

    // Simulate incoming message
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = { id: 'blahblah-test-id', type: 'user', user: 'SmarterChild', text: 'I am the master chatbot', colour: 'red' };
      const messages = this.state.messages.concat(newMessage)

      this.setState({ messages: messages })
    }, 300);
  }

  newMessage(messageText){

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

    const newSystemMessageObj = {
      type: 'system',
      text: `${this.state.user} changed their name to ${newUsername}`
    }
    
    this.socket.send(JSON.stringify(newSystemMessageObj));
  }

  // similar to setUsername but will broadcast a system message
  setUsername(user) {
    this.newSystemMessage(user);
    this.setState({
      user: user
    });
  }

// TODO: re-remember why "70px 0 100px" does what it does

  render() {
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