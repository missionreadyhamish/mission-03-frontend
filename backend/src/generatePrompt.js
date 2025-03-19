const {
  generateBasePrompt,
  generateEvaluationPrompt,
  generateQuestionPrompt,
} = require("./promptUtils");

/**
 * Generates the prompt for the AI based on interview context
 * @param {string} jobTitle - The position being interviewed for
 * @param {string} userMessage - The latest message from the candidate
 * @param {Array} messageHistory - Previous conversation history
 */
const generatePrompt = (jobTitle, userMessage, messageHistory) => {
  const questionCount = messageHistory.filter((m) => m.role === "model").length;
  const basePrompt = generateBasePrompt(jobTitle, messageHistory);

  if (questionCount >= 6) {
    return generateEvaluationPrompt(basePrompt);
  }

  return generateQuestionPrompt(basePrompt, userMessage);
};

module.exports = generatePrompt;
