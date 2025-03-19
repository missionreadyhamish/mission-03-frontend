import React from "react";
import "./styles/App.css";
import Header from "./components/Header";
import ChatBox from "./components/Chatbox";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <ChatBox />
      <Footer />
    </div>
  );
}

export default App;
