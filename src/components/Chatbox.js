// Import necessary dependencies
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Chatbox.module.css";

// Import necessary icons
import { FaTimes, FaMinus } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { BiSend } from "react-icons/bi";

const Chatbox = () => {
  // State management for chat functionality
  const [jobTitle, setJobTitle] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const messagesEndRef = useRef(null); // Reference for auto-scrolling

  // Auto-scroll function to keep the chat view at the bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        const container = messagesEndRef.current.parentElement;
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  };

  // Effect hook to trigger auto-scroll when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect hook for initial chat visibility
  useEffect(() => {
    if (isChatboxVisible) {
      scrollToBottom();
    }
  }, [isChatboxVisible]);

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
      console.log("Sending API request with:", JSON.stringify(requestBody, null, 2));

      // Make API call to get interviewer's response
      const response = await axios.post("http://localhost:5000/api/interview", requestBody);

      // Create interviewer message object for display
      const newBotMessage = {
        sender: "interviewer",
        text: response.data.reply,
      };

      // Update chat history with both messages
      setMessages((prevMessages) => [...prevMessages, newUserMessage, newBotMessage]);
      setUserInput(""); // Clear input field
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get response from interviewer");
    }
  };

  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  // Component render section
  return (
    <>
      <div className={`${styles.chatbox} ${isChatboxVisible ? styles.visible : ""}`}>
        <div className={styles.headerButtons}>
          <button className={styles.headerButton} onClick={() => setIsChatboxVisible(false)}>
            <FaMinus size={16} />
          </button>
          <button className={styles.headerButton} onClick={toggleChatbox}>
            <FaTimes size={16} />
          </button>
        </div>

        {/* Instructions section - moved above job title */}
        {!isInterviewStarted && (
          <div className={styles.instructionsContainer}>
            <h3 className={styles.instructionsTitle}>Welcome to Tuners Interview Practice!</h3>
            <div className={styles.instructionsList}>
              Practice your interviewing skills with our AI-powered assistant. Get personalized
              questions and feedback based on the position you're applying for. Ready to start?
              Enter your desired job title below!
            </div>
          </div>
        )}

        <div className={styles.jobTitleContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter Job Title "
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
                Begin Interview!
              </button>
            )}
          </div>
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
              <p className={styles.messageText}>{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* User input form - always visible but conditionally disabled */}
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={
              isInterviewStarted ? "Type your response..." : "Please start interview first"
            }
            className={styles.messageInput}
            disabled={!isInterviewStarted}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!isInterviewStarted || !userInput.trim()}
          >
            <BiSend size={21} />
          </button>
        </form>
      </div>

      {!isChatboxVisible && (
        <div className={styles.chatButton} onClick={toggleChatbox}>
          <TiMessages />
        </div>
      )}
    </>
  );
};

export default Chatbox;
