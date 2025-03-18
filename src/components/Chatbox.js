import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Chatbox.module.css";

const Chatbox = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startInterview = async () => {
    if (!jobTitle.trim()) {
      alert("Please enter a job title");
      return;
    }

    setIsInterviewStarted(true);
    const initialMessage = {
      sender: "interviewer",
      text: "Tell me about yourself.",
    };
    setMessages([initialMessage]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    const newUserMessage = {
      sender: "user",
      text: userInput,
    };

    try {
      // Send message to server
      const response = await axios.post("http://localhost:5000/api/interview", {
        jobTitle,
        message: userInput,
        messageHistory: messages,
      });

      // Add bot response to chat
      const newBotMessage = {
        sender: "interviewer",
        text: response.data.reply,
      };

      setMessages((prevMessages) => [...prevMessages, newUserMessage, newBotMessage]);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get response from interviewer");
    }
  };

  return (
    <div className={styles.chatbox}>
      <div className={styles.jobTitleContainer}>
        <input
          type="text"
          placeholder="Enter the job title you're interviewing for..."
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          disabled={isInterviewStarted}
          className={styles.jobTitleInput}
        />
        {!isInterviewStarted && (
          <button
            onClick={startInterview}
            className={styles.startButton}
            disabled={!jobTitle.trim()}
          >
            Start Interview
          </button>
        )}
      </div>

      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.sender === "user" ? styles.userMessage : styles.botMessage
            }`}
          >
            <span className={styles.messageSender}>
              {message.sender === "user" ? "You" : "Interviewer"}:
            </span>
            <p className={styles.messageText}>{message.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isInterviewStarted && (
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response..."
            className={styles.messageInput}
          />
          <button type="submit" className={styles.sendButton} disabled={!userInput.trim()}>
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Chatbox;
