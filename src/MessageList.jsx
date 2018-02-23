import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const messages = this.props.messages.map( (message) => {
      
      // For handling render of user msgs
      if (message.type === 'user') {
        // need to pass data flow to Message.jsx now
        return (
          <Message key={message.id} message={message} colour={message.colour}/>
        )
      } else if (message.type === 'system') {
        return (
          <div key={message.id} className="message system">
            {message.text}
          </div>
        )
      }
    });

    return (
    <div className='messages'>
      {messages}
    </div>);
  }
}

export default MessageList;