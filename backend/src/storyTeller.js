const api = require('./gemini/api');

async function generateStory(prompt, audience, genre) {
    const combinedPrompt = `${prompt}. This story is for an ${audience} audience. The genre for the story should be ${genre}.`;
    const result = await api.generateContent(combinedPrompt);
    console.log(result);
    return result.response.candidates[0].content.parts[0].text;
}

module.exports = {
    generateStory
};