import React, { Component } from 'react';
import request from "request";
import config from "./configLoader";

import "./App.css";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={() => {
              console.log("Matthias");
              const postData = {truc: 8};
              request.post({url: config.backHost + "query/listItemModule", form: postData}, (err, httpResponse, body) => {
                  if (err) {
                      return console.error('upload failed:', err);
                  }
                  console.log('Upload successful! Server responded with:', body);
              });
          }}/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
