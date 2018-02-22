import React, {Component} from 'react';

class Navbar extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      < nav className = "navbar" >
        <a href="/" className="navbar-brand">Chatty</a>
        <h3>{this.props.usersOnline}</h3>
      </nav >
    );
  }  
}

export default Navbar;