const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });


async function generateContent(prompt) {
    const response = await model.generateContent(prompt);
    return response;
}

module.exports = {
    generateContent
}