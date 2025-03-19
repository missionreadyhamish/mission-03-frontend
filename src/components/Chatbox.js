// Import necessary dependencies
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Chatbox.module.css";

const Chatbox = () => {
  // State management for chat functionality
  const [jobTitle, setJobTitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  // Auto-scroll function to keep the chat view at the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect hook to trigger auto-scroll when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initializes the interview session with a job title
  const startInterview = async () => {
    if (!jobTitle.trim()) {
      alert("Please enter a job title");
      return;
    }

    console.log("Starting interview for job title:", jobTitle);

    setIsInterviewStarted(true);
    const initialMessage = {
      sender: "interviewer",
      text: "Tell me about yourself.",
    };
    setMessages([initialMessage]);
  };

  // Handles the submission of user messages and receives AI responses
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Create user message object for display
    const newUserMessage = {
      sender: "user",
      text: userInput,
    };

    try {
      // Format message history for API consumption
      const formattedHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      // Prepare request payload
      const requestBody = {
        jobTitle,
        message: userInput,
        messageHistory: formattedHistory,
      };

      // Debug log for API request
      console.log(
        "Sending API request with:",
        JSON.stringify(requestBody, null, 2)
      );

      // Make API call to get interviewer's response
      const response = await axios.post(
        "http://localhost:4000/api/interview",
        requestBody
      );

      // Create interviewer message object for display
      const newBotMessage = {
        sender: "interviewer",
        text: response.data.reply,
      };

      // Update chat history with both messages
      setMessages((prevMessages) => [
        ...prevMessages,
        newUserMessage,
        newBotMessage,
      ]);
      setUserInput(""); // Clear input field
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get response from interviewer");
    }
  };

  // Component render section
  return (
    <div className={styles.chatbox}>
      {/* Job title input section */}
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

      {/* Chat messages display section */}
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

      {/* User input form - only shown when interview is active */}
      {isInterviewStarted && (
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response..."
            className={styles.messageInput}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!userInput.trim()}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Chatbox;
