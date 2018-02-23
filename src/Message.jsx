import React, {Component} from 'react';
// import MessageList from './MessageList.jsx';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      this.props.imgSrc ? 
      (<div className="message container">
        <span className="message-username col-md-5" style={{color: this.props.colour}}>{this.props.message.user}</span>
        <div className="jumbotron col-md-6">
          <h4><a href={this.props.imgSrc}>Giphy</a></h4>
          <img src={this.props.imgSrc} className="message-giphy"/>
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



