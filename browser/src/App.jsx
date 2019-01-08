import React, { Component } from 'react';
import './App.scss';
import Router from './routers/router'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router />
        </header>
      </div>
    );
  }
}

export default App;
