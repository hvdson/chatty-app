import React, {Component} from 'react';

class Navbar extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      < nav className = "navbar" >
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-users-online">Users online: {this.props.usersOnline}</span>
      </nav >
    );
  }  
}

export default Navbar