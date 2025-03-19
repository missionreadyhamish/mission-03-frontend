const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

// Server setup and configuration
const app = express();
const port = 4000;

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
 * Generates the prompt for the AI based on interview context
 * @param {string} jobTitle - The position being interviewed for
 * @param {string} userMessage - The latest message from the candidate
 * @param {Array} messageHistory - Previous conversation history
 */
const generatePrompt = (jobTitle, userMessage, messageHistory) => {
  const questionCount = messageHistory.filter((m) => m.role === "model").length;
  const basePrompt = `You are an AI interviewer for a ${jobTitle} position.
                      You should also make the candidate laugh.
                      The candidate's previous responses are:
                      ${messageHistory
                        .map((m) => `${m.role}: ${m.parts[0].text}`)
                        .join("\n")}`;

  if (questionCount >= 6) {
    return `${basePrompt}
            Based on the candidate's responses in the interview, provide a detailed evaluation of their performance.
            Include specific strengths, areas for improvement, and actionable suggestions.
            Be professional but constructive in your feedback.
            **Provide a summary of how well you think the user did in the interview.**`;
  }

  return `${basePrompt}
          The candidate just said: "${userMessage}".
          What is your next question for the candidate?
          Keep the question concise and relevant to the conversation.
          Do not repeat previous questions.
          Do not provide canned scenarios or pre-defined questions.`;
};

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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
