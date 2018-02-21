import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const RandomId = require('./RandomId.js');
// const WebSocket = require('ws');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: 'Anon1',
      messages: [
      {
        id: 'poop',
        type: 'system',
        text: 'Anon1 changed their name to nomnom.'
      }, {
        id: 'sick-id-bro',
        type: 'user',
        text: 'Dank memes',
        user: 'nomnom'
      }]
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
      console.log('Connected to ws-server');
      // this.socket.send(JSON.stringify(this.state));
    }

    this.socket.onmessage = (event) => {

      const newMessages = this.state.messages.concat(JSON.parse(event.data));
      this.setState({
        messages: newMessages
      });
    }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 'blahblah-test-id', type: 'user', user: 'Michelle', text: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage)

      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }


  newMessage(messageText){
    // const newId = RandomId();
    const newMessageObj = {
      type: 'user',
      text: messageText,
      user: this.state.user
    }

    // TODO: send to server 1st before adding to msg list
    this.socket.send(JSON.stringify(newMessageObj));
  }

  setUsername(user) {
    this.setState({
      user: user
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.user} setUsername={this.setUsername.bind(this)} newMessage={this.newMessage.bind(this)}/>
      </div>
    ); 
  }
}
export default App;