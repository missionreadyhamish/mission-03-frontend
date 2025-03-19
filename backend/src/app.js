const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const generatePrompt = require("./generatePrompt");

// Server setup and configuration
const app = express();

// Initialize Google Gemini AI with API key from .env file
const apiKey = process.env.GOOGLE_API_KEY;

// AI model configuration for response generation
const generationConfig = {
  temperature: 0.7, // Controls response randomness (0.0-1.0)
  maxOutputTokens: 1024, // Maximum length of generated responses
};

// Middleware setup
app.use(cors());
app.use(express.json());

/**
 * Main interview endpoint - handles conversation flow and AI responses
 * Processes user input and returns AI-generated interviewer responses
 */
app.post("/api/interview", async (req, res) => {
  const { jobTitle, messageHistory } = req.body;

  // Debug logging for message history
  console.log(
    "Received messageHistory:",
    JSON.stringify(messageHistory, null, 2)
  );

  try {
    // Validate message history format
    const lastMessageText =
      messageHistory?.[messageHistory.length - 1]?.parts?.[0]?.text;

    if (!messageHistory?.length || !lastMessageText) {
      return res.status(400).json({ error: "Invalid message history format" });
    }

    // Generate AI prompt based on context
    const prompt = generatePrompt(jobTitle, lastMessageText, messageHistory);

    console.log("Generated Prompt:", prompt);

    try {
      // Call Gemini AI API for response generation
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Debug logging for AI response
      console.log("Gemini Result:", JSON.stringify(response.data, null, 2));

      // Validate and extract AI response
      const aiResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiResponse) {
        res.json({ reply: aiResponse });
      } else {
        console.error("Unexpected Gemini API response:", response.data);
        return res
          .status(500)
          .json({ error: "Unexpected Gemini API response format" });
      }
    } catch (apiError) {
      // Handle Gemini API specific errors
      console.error(
        "Gemini API Error:",
        apiError.response ? apiError.response.data : apiError.message
      );
      return res.status(500).json({
        error: "Gemini API request failed",
        details: apiError.response ? apiError.response.data : apiError.message,
      });
    }
  } catch (error) {
    // Handle general server errors
    console.error("Error generating response:", error);
    res
      .status(500)
      .json({ error: "Failed to generate response", details: error.message });
  }
});

module.exports = app;
