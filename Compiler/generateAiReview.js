const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const generateAiReview = async (code, problemDescription) => {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are an AI code reviewer.
Problem:
${problemDescription}
Code:
${code}
Review this code briefly and Give Suggestions Briefly.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

module.exports = {
  generateAiReview,
};
