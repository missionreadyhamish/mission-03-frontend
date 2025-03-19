const generateBasePrompt = (jobTitle, messageHistory) => {
  return `You are an AI interviewer for a ${jobTitle} position.
          You should also make the candidate laugh.
          The candidate's previous responses are:
          ${messageHistory
            .map((m) => `${m.role}: ${m.parts[0].text}`)
            .join("\n")}`;
};

const generateEvaluationPrompt = (basePrompt) => {
  return `${basePrompt}
          Based on the candidate's responses in the interview, provide a detailed evaluation of their performance.
          Include specific strengths, areas for improvement, and actionable suggestions.
          Be professional but constructive in your feedback.
          **Provide a summary of how well you think the user did in the interview.**`;
};

const generateQuestionPrompt = (basePrompt, userMessage) => {
  return `${basePrompt}
          The candidate just said: "${userMessage}".
          What is your next question for the candidate?
          Keep the question concise and relevant to the conversation.
          Do not repeat previous questions.
          Do not provide canned scenarios or pre-defined questions.`;
};

module.exports = {
  generateBasePrompt,
  generateEvaluationPrompt,
  generateQuestionPrompt,
};
