import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./assets/main.scss";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="app">
      <h2>T C</h2>
      <Form />
    </div>
  );
};

export default hot(module)(App);
