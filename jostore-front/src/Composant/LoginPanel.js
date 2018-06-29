import React, {Component} from "react";
import "./LoginPanel.css";

class LoginPanel extends Component{

  constructor(props){
    super(props);
    this.state = {hidden: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({hidden: true});
  }

  render(){
    return (
      <div className={"LoginPanel" + (this.state.hidden ? " hidden" : "")}>
        <div className="LoginPanel-background"/>
        <div className="LoginPanel-content">
          <form className="LoginForm" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Nom :</label>
            <input type="text" id="name" name="user_name"/>
            <label>Mot de passe :</label>
            <input type="text" id="name" name="user_name"/>
            <button className="LoginFormSubmit" type="submit">Connexion</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPanel;