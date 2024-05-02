const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
// const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

async function generatePersona(prompt) {
    const personaPrompt = `Generate an author persona based on the following prompt: ${prompt}`
    const response = await model.generateContent(personaPrompt);
    return response;
}

async function generateGuidelines(prompt) {
    const guidelinesPrompt = `Generate guidelines based on the following prompt: ${prompt}`
    const response = await model.generateContent(guidelinesPrompt);
    return response;
}

async function generatePremisePrompt(prompt) {
    const persona = await generatePersona(prompt);
    const premisePrompt = `Using Persona from ${persona}, Generate a premise based on the following prompt: ${prompt}`
    const response = await model.generateContent(premisePrompt);
    return response;
}

async function generateOutlinePrompt(prompt) {
    const persona = await generatePersona(prompt);
    const premise = await generatePremisePrompt(prompt);
    const outlinePrompt = `User persona from ${persona} and premise prompt from ${premise} Generate an outline based on the following prompt: ${prompt}`
    const response = await model.generateContent(outlinePrompt);
    return response;
}

async function generateStartingPrompt(prompt) {
    const persona = await generatePersona(prompt);
    const premise = await generatePremisePrompt(prompt);
    const outline = await generateOutlinePrompt(prompt);
    const guidelined = await generateGuidelines(prompt);
    const startingPrompt = `Use persona from ${persona}, premise from ${premise}, outline from ${outline}, and guidelines from ${guidelined} to generate a starting prompt based on the following prompt: ${prompt}`
    const response = await model.generateContent(startingPrompt);
    return response;
}



const ENDING_SENTENCE = "IAMDONE";
async function generateContent(prompt) {
    const response = await model.generateContent(prompt);
    return response;
}

async function generate_with_retry(prompt) {
    const response = await model.generateContent(prompt);
    return response;
}

async function temptGenerateContent(prompt) {
    const persona = await generatePersona(prompt);
    const premise_prompt = await generatePremisePrompt(prompt);
    const outline_prompt = await generateOutlinePrompt(prompt);
    const starting_prompt = await generateStartingPrompt(prompt);
    const continuation_prompt = "Using persona from {persona}, premise from {premise}, outline from {outline}, and starting prompt from {story_text}, continue the story."

    const premise = (await generate_with_retry(premise_prompt)).text;
    const outline = (await generate_with_retry(outline_prompt.format({ premise: premise }))).text;
    const starting_draft = (await generate_with_retry(starting_prompt.format({ premise: premise, outline: outline }))).text;
    let draft = starting_draft;
    let continuation = (await generate_with_retry(continuation_prompt.format({ premise: premise, outline: outline, story_text: draft }))).text;
    draft = draft + '\n\n' + continuation;
    while (!continuation.includes(ENDING_SENTENCE)) {
        console.log(continuation);
        continuation = (await generate_with_retry(continuation_prompt.replace('{premise}', premise).replace('{outline}', outline).replace('{story_text}', draft))).text;
        draft += '\n\n' + continuation;
    }
    const final = draft.replace(ENDING_SENTENCE, '');
    return final;
}


module.exports = {
    generateContent
}