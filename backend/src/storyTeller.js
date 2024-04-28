const api = require('./gemini/api');

async function generateStory(prompt, audience, genre, wordLength) {
    const combinedPrompt = `${prompt}. This story is for an ${audience} audience. The genre for the story should be ${genre}. The length of the story should be around ${wordLength} words.`;
    const result = await api.generateContent(combinedPrompt);
    console.log(result);
    return result.response.candidates[0].content.parts[0].text;
}

module.exports = {
    generateStory
};