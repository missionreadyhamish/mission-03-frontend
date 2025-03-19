const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 5001;

// Initialize Google Gemini AI with API key from .env file
const apiKey = process.env.GOOGLE_API_KEY;

// Generation configuration
const generationConfig = {
  temperature: 0.7,
  maxOutputTokens: 1024,
};

app.use(cors());
app.use(express.json());

const generatePrompt = (jobTitle, userMessage, messageHistory) => {
  const questionCount = messageHistory.filter((m) => m.role === "model").length;

  if (questionCount >= 6) {
    return `You are an AI interviewer for a ${jobTitle} position.
                    Based on the candidate's responses in the interview, provide a detailed evaluation of their performance.
                    The candidate's previous responses are:
                ${messageHistory.map((m) => `${m.role}: ${m.parts[0].text}`).join("\n")}
                
                    Include specific strengths, areas for improvement, and actionable suggestions.
                    Be professional but constructive in your feedback.
                    **Provide a summary of how well you think the user did in the interview.**`;
  }

  return `You are an AI interviewer for a ${jobTitle} position.
                The candidate's previous responses are:
                ${messageHistory.map((m) => `${m.role}: ${m.parts[0].text}`).join("\n")}

                The candidate just said: "${userMessage}".

                What is your next question for the candidate?
                Keep the question concise and relevant to the conversation.
                Do not repeat previous questions.
                Do not provide canned scenarios or pre-defined questions.`;
};

app.post("/api/interview", async (req, res) => {
  const { jobTitle, messageHistory } = req.body;

  console.log("Received messageHistory:", JSON.stringify(messageHistory, null, 2)); // Log with formatting

  try {
    if (
      !messageHistory ||
      messageHistory.length === 0 ||
      !messageHistory[messageHistory.length - 1].parts ||
      !messageHistory[messageHistory.length - 1].parts[0] ||
      !messageHistory[messageHistory.length - 1].parts[0].text
    ) {
      return res.status(400).json({ error: "Invalid message history format" });
    }

    const prompt = generatePrompt(
      jobTitle,
      messageHistory[messageHistory.length - 1].parts[0].text,
      messageHistory
    );

    console.log("Generated Prompt:", prompt);

    try {
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

      console.log("Gemini Result:", JSON.stringify(response.data, null, 2)); // Log with formatting

      if (
        response.data &&
        response.data.candidates &&
        response.data.candidates[0] &&
        response.data.candidates[0].content &&
        response.data.candidates[0].content.parts &&
        response.data.candidates[0].content.parts[0] &&
        response.data.candidates[0].content.parts[0].text
      ) {
        res.json({ reply: response.data.candidates[0].content.parts[0].text });
      } else {
        console.error("Unexpected Gemini API response:", response.data);
        return res.status(500).json({ error: "Unexpected Gemini API response format" });
      }
    } catch (apiError) {
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
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
