import React, {Component} from 'react';
// import MessageList from './MessageList.jsx';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.message.gifData ? 
      (<div className="message container">
        <span className="message-username col-md-5" style={{color: this.props.colour}}>{this.props.message.user}</span>
        <div className="col-md-4 message-giphy">
          <header className="giphy-description"><a href={this.props.message.text}>From Giphy</a><span className="giphy-description">(app)</span></header>
          <img src={this.props.message.gifData.url} className="giphy-img"/>
          <footer></footer>
        </div>
        <span className="message-content">{this.props.message.text}</span>
      </div>)
      :
      (<div className="message container">
        <span className="message-username col-md-5" style={{ color: this.props.colour }}>{this.props.message.user}</span>
        <span className="message-content">{this.props.message.text}</span>
      </div>)
    );
  }
}

export default Message;



