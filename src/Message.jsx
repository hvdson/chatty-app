import React, {Component} from 'react';
// import MessageList from './MessageList.jsx';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("inside <Message/> bruh");
    return (
      <div className="message">
        <span className="message-username">{this.props.message.user}</span>
        <span className="message-content">{this.props.message.text}</span>
      </div>
    );
  }
}

export default Message;



