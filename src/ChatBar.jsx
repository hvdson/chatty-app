import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      messageText: '',
      currentUser: this.props.currentUser
    };
    this.commands = ['/giphy'];
  }
  
  // ----------------------------------------------------------------------
  // for .onMessage
  // ----------------------------------------------------------------------
  // when enterkey is pressed
  onMessageKeyPress(event) {
    if (event.key === 'Enter') {

      let messageContent = event.target.value;

      // if there's value in content
      if (messageContent) {

        // for handling only valid commands to be sent to server
        // we don't want ppl to be sending something potentially malicious
        if (messageContent[0] == '/') {
          // extracting the command from the messageContent
          
          let messageParts = messageContent.split(' ');

          if (this.commands.indexOf(messageParts[0]) !== -1) {
            this.props.newMessage(this.state.messageText);
            this.setState({ messageText: '' });

          } else {
            console.log('invalid');
          }

        } else {
        console.log(event.key);
        // Enter was pressed!
        // TODO: in App.jsx create new method newMessage to concat to react's state
        this.props.newMessage(this.state.messageText);
        this.setState({messageText: ''});
        }
      }
    }
  }

  onMessageTextChange(event) {
    // update state of dom as user types into chatbar
    this.setState({messageText: event.target.value});
  }

  // ----------------------------------------------------------------------
  // for .onUsername
  // ----------------------------------------------------------------------

  // state of superclass (app) has user defined just as 'string' type
  // needed to pass a method from the superclass to this child component as a prop in order to mutate values from parent
  // data can only be changed internally by the parent class

  // error handling for empty user input

  onUsernameKeyPress(event) {
    // only set the username if there's value in 

    // need to update send system message here!

    if (event.key === 'Enter') {
      if (event.target.value) {
        console.log(event.key);
        // Enter was pressed!
        this.props.setUsername(this.state.currentUser);

        //clear the text field (bound to the target obj)
        // this.setState({ currentUser: '' });
      }
    }
  }

  onUsernameTextChange(event) {
    // update state of dom as user types into chatbar
    this.setState({ currentUser: event.target.value });
  }
  

  render() {
    return (
      <div className="chatbar">
        <footer className="row">
        <input 
        className="col-3 form-control-lg"
        // defaultValue={this.state.currentUser}
        // just change .onMessage to .onUsername && define methods
        onChange={this.onUsernameTextChange.bind(this)}
        placeholder="Change username (Default: Anon)"
        onKeyPress={this.onUsernameKeyPress.bind(this)}
        />

        <input 
        className="col-9 form-control-lg"
        value={this.state.messageText}
        onChange={this.onMessageTextChange.bind(this)}
        placeholder="Type a message and hit ENTER"
        onKeyPress={this.onMessageKeyPress.bind(this)}
        />

      </footer>
      </div>
    );
  }
}

export default ChatBar;