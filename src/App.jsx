import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import RandomId from './RandomId.js';

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

  // Called after the component was rendered and it was attached to the DOM.
  // This is a good place to make AJAX requests or setTimeout.
  // Guaranteed that DOM elem exists on the page
  // componentDidMount() {
  //   // after 3 seconds set loading to false
  //   setTimeout(() => {
  //     this.setState({loading: false});
  //   }, 3000);
  // }

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

  setUsername(user) {
    this.setState({
      user: user
    });
  }

  render() {
    console.log("inside <App/> bruh");
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
