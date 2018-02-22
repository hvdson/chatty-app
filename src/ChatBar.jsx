import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      messageText: '',
      currentUser: this.props.currentUser
    };

  }
  
  // ----------------------------------------------------------------------
  // for .onMessage
  // ----------------------------------------------------------------------
  // when enterkey is pressed
  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      if (event.target.value) {
        console.log(event.key);
        // Enter was pressed!
        // TODO: in App.jsx create new method newMessage to concat to react's state
        this.props.newMessage(this.state.messageText);
        this.setState({messageText: ''});
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
    console.log("inside <ChatBar/> bruh");
    return (
      <footer className="chatbar">
        <input 
        className="chatbar-username"
        defaultValue={this.state.currentUser}
        // just change .onMessage to .onUsername && define methods
        onChange={this.onUsernameTextChange.bind(this)}
        placeholder="Change username (OPTIONAL)"
        onKeyPress={this.onUsernameKeyPress.bind(this)}
        />


        <input 
        className="chatbar-message" 
        value={this.state.messageText}
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

// TODO:

// Anon1 changed their name to nomnom.
//   nomnom
// Dank memes
// Anon1
// Anon1
// o shit waddup
// is this bad
// y
// is this bad
// wait
// is this bad
// username change should display a system message for different state
// is this bad
// and onEnter should affect both username input and message input
// is this bad
// b / c on enter left side doesn't change if you have a different val on both sides
// is this bad
// since the username input field is handled by a different method
// is this bad
// like this below:
// is this bad
//   * cleared the name field and just typing into message bar *
//     is this bad
//       * should change back to anon maybe ? or just clear the username field to blank *
// * now i pressed enter and message field is blank - this text is in the username field *
// * cleared the username field and now typing msg  - username is now defined as ^ *