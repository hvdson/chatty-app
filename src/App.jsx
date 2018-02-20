import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: 'Anon1',
      messages: [
      {
        id: 1,
        type: 'system',
        text: 'Anon1 changed their name to nomnom.'
      }, {
        id: 2,
        type: 'user',
        text: 'Dank memes',
        user: 'nomnom'
      }]
    };
  }

  newMessage(messageText){
    const newMessageObj = {
      id: Math.random(),
      type: 'user',
      text: messageText,
      user: this.state.user
    }

    const newMessages = this.state.messages.concat(newMessageObj);
    this.setState({
      messages: newMessages
    });
  }

  render() {
    console.log("inside <App/> bruh");
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <ChatBar newMessage={this.newMessage.bind(this)}/>
      </div>
    ); 
  }
}
export default App;
