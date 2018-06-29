import React, {Component} from "react";
import Header from "./Composant/Header";
import LoginPanel from "./Composant/LoginPanel";
import Stand from "./Composant/Stand";
import Foot from "./Composant/Foot";

import "./App.css";

class App extends Component{
  render(){
    return (
      <div className="App">
        <LoginPanel/>
        <div className="App-content">
          <Header/>
          <Stand/>
          <Foot/>
        </div>
      </div>
    );
  }
}

export default App;
