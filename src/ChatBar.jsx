import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      messageText: ''
    };
  }
  

  // when enterkey is pressed
  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      console.log(event.key);
      // Enter was pressed!
      // TODO: in App.jsx create new method newMessage to concat to react's state
      this.props.newMessage(this.state.messageText);
      this.setState({messageText: ''});
    }
  }
  
  onMessageTextChange(event) {
    // update state of dom as user types into chatbar
    this.setState({messageText: event.target.value});
  }

  render() {
    console.log("inside <ChatBar/> bruh");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />

        <input 
        value={this.state.messageText}
        className="chatbar-message" 
        onChange={this.onMessageTextChange.bind(this)}
        placeholder="Type a message and hit ENTER"
        onKeyPress={this.onMessageKeyPress.bind(this)}
        />

      </footer>
    );
  }
}

export default ChatBar;


// <footer className="chatbar">
//   <input className="chatbar-username" placeholder="Your Name (Optional)" />
//   <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
// </footer>