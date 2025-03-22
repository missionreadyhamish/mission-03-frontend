import React from "react";
import "./styles/App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Chatbox from "./components/Chatbox";

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
     
      <Chatbox />
      
      
    </div>
  );
}

export default App;