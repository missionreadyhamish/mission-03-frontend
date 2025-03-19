import React from "react";
import "./styles/App.css";
import Header from "./components/Header";
import ChatBox from "./components/Chatbox";

function App() {
  return (
    <div className="App">
      <Header />
      <ChatBox />
    </div>
  );
}

export default App;
