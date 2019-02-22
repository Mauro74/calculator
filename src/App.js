import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import Form from "./components/Form";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h2>T C</h2>
        <Form />
      </div>
    );
  }
}

export default hot(module)(App);
