const api = require('./gemini/api');

async function generateStory(prompt, audience, genre) {
    const combinedPrompt = `${prompt}. This story is for an ${audience} audience. The genre for the story should be ${genre}.`;
    const result = await api.generateContent(combinedPrompt);
    console.log(result);
    console.log(result);
    return result.response.candidates[0].content.parts[0].text;
}


async function generatestorywithparams(prompt, audience, genre) {
    // if prompt is empty return a dummy text
    if (!prompt || prompt === "" || audience === "" || genre === "" || !audience || !genre) {
        return "Once upon a time, in a faraway land, there was a story that was never told.";
    }
    const combinedPrompt = `${prompt}. This story is for an ${audience} audience. The genre for the story should be ${genre}.`;
    const result = await api.generateContent(combinedPrompt);
    console.log(result);
    return result.response.candidates[0].content.parts[0].text;
}
module.exports = {
    generateStory,
    generatestorywithparams
};