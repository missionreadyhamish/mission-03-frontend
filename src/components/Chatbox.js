import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Chatbox.module.css";
// Import icons used for chat interface controls
import { FaTimes, FaMinus } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { BiSend } from "react-icons/bi";

const port = process.env.REACT_APP_SERVER_PORT || 5000;
console.log(`Connecting to backend via port ${port}`);

// used to store the session ID for save history
let sessionID;

const Chatbox = () => {
  // Core state management for chat functionality
  const [jobTitle, setJobTitle] = useState(""); // Stores the job position being interviewed for
  const [messages, setMessages] = useState([]); // Maintains chat history between user and AI
  const [userInput, setUserInput] = useState(""); // Handles current user input in textarea
  const [isInterviewStarted, setIsInterviewStarted] = useState(false); // Controls interview flow
  const [isChatboxVisible, setIsChatboxVisible] = useState(false); // Controls chat window visibility
  const [isTyping, setIsTyping] = useState(false); // Controls typing animation display
  const messagesEndRef = useRef(null); // Reference for auto-scrolling to latest message

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initializes the interview session after job title is submitted
  // Sets initial state and sends welcome message
  const startInterview = async () => {
    if (!jobTitle.trim()) {
      alert("Please enter a job title");
      return;
    }

    async function sessionLogger() {
      console.log("Starting interview for job title:", jobTitle);
      // Prepare data for API request
      const requestBody = { jobTitle: jobTitle };
      sessionID = await axios.post(`http://localhost:${port}/api/save-session`, requestBody).JSON.stringify();
      console.log(`sessionID: ${sessionID}`);

    }

    sessionLogger();

    setIsInterviewStarted(true);
    const initialMessage = {
      sender: "interviewer",
      text: "Tell me about yourself.",
    };
    setMessages([initialMessage]);
  };

  // Processes user messages and manages API communication
  // Handles message formatting, sending, and response display
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Create and store user's message
    const newUserMessage = {
      sender: "user",
      text: userInput,
    };

    try {
      // Update UI and prepare for API response
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setUserInput("");
      setIsTyping(true);

      // Format chat history for API consumption
      const formattedHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      // Prepare data for API request
      const requestBody = {
        jobTitle,
        message: userInput,
        messageHistory: formattedHistory,
      };

      // Debug log for API request
      console.log("Sending API request with:", JSON.stringify(requestBody, null, 2));

      // Artificial delay for more natural conversation flow
      await new Promise((resolve) => setTimeout(resolve, 2500));
      console.log(`http://localhost:${port}/api/interview`);

      // Make API call and process response
      const response = await axios.post(`http://localhost:${port}/api/interview`, requestBody);


      // Format and display AI response
      const newBotMessage = {
        sender: "interviewer",
        text: response.data.reply,
      };

      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
      alert("Failed to get response from interviewer");
    }
  };

  // Toggles chat window visibility
  const toggleChatbox = () => {
    setIsChatboxVisible(!isChatboxVisible);
  };

  return (
    <>
      {/* Main chat interface container */}
      <div className={`${styles.chatbox} ${isChatboxVisible ? styles.visible : ""}`}>
        {/* Chat window control buttons */}
        <div className={styles.headerButtons}>
          <button className={styles.headerButton} onClick={() => setIsChatboxVisible(false)}>
            <FaMinus size={16} />
          </button>
          <button className={styles.headerButton} onClick={toggleChatbox}>
            <FaTimes size={16} />
          </button>
        </div>

        {/* Welcome instructions shown before interview starts */}
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

        {/* Job title input or display section */}
        <div className={styles.jobTitleContainer}>
          <div className={styles.inputWrapper}>
            {isInterviewStarted ? (
              <div className={styles.jobTitleDisplay}>
                You're applying for the position: {jobTitle}
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter Job Title "
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={isInterviewStarted}
                  className={styles.jobTitleInput}
                />
                <button
                  onClick={startInterview}
                  className={styles.startButton}
                  disabled={!jobTitle.trim()}
                >
                  Begin Interview!
                </button>
              </>
            )}
          </div>
        </div>

        {/* Message history display area */}
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
          {isTyping && (
            <div className={`${styles.typingIndicator} ${styles.visible}`}>
              <span className={styles.typingDot}></span>
              <span className={styles.typingDot}></span>
              <span className={styles.typingDot}></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* User input area with dynamic textarea */}
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={
              isInterviewStarted ? "Type your response..." : "Please start interview first"
            }
            className={styles.messageInput}
            disabled={!isInterviewStarted}
            rows="1"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
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

      {/* Floating chat button - visible when chat is minimized */}
      {!isChatboxVisible && (
        <div className={styles.chatButton} onClick={toggleChatbox}>
          <TiMessages />
        </div>
      )}
    </>
  );
};

export default Chatbox;
