const api = require('./gemini/api');
const testPrompts = require('./testData');


const defaultGuideline = `Delve deeper. Lose yourself in the world you're building. Unleash vivid
descriptions to paint the scenes in your reader's mind. Develop your
characters—let their motivations, fears, and complexities unfold naturally.
Weave in the threads of your outline, but don't feel constrained by it. Allow
your story to surprise you as you write. Use rich imagery, sensory details, and
evocative language to bring the setting, characters, and events to life.
Introduce elements subtly that can blossom into complex subplots, relationships,
or worldbuilding details later in the story. Keep things intriguing but not
fully resolved. Avoid boxing the story into a corner too early. Plant the seeds
of subplots or potential character arc shifts that can be expanded later.

Remember, your main goal is to write an engaging story. If you get through
the story too fast, that is bad. Expand, never summarize.`

function generateAuthor(genre, audience) {
    return `You are an award-winning science fiction author with a penchant for expansive, intricately woven stories. 
    Your ultimate goal is to write the next award winning story in the ${genre} genre. The story should be for a ${audience} audience.`;
}

async function generatePremise(authorPrompt, debug = false) {
    if (debug) return testPrompts.premisePrompt;

    const combinedPrompt = `${authorPrompt} 
    Write a single sentence premise for a new story.`;

    const result = await api.generateContent(combinedPrompt);
    return result.response.candidates[0].content.parts[0].text;
}

async function generateOutline(authorPrompt, premisePrompt, debug = false) {
    if (debug) return testPrompts.outlinePrompt;

    const combinedPrompt = `${authorPrompt} 
    You have a gripping premise in mind:

    ${premisePrompt}

    Write an outline for the plot of your story.`;

    const result = await api.generateContent(combinedPrompt);
    return result.response.candidates[0].content.parts[0].text;
}

async function generateStory(authorPrompt, premisePrompt, outlinePrompt, guidelinePrompt = defaultGuideline, storySoFar = '', debug = false) {
    if (debug) return testPrompts.story;

    const combinedPrompt = storySoFar === '' ? `${authorPrompt}

You have a gripping premise in mind:

${premisePrompt}

Your imagination has crafted a rich narrative outline:

${outlinePrompt}

First, silently review the outline and the premise. Consider how to start the
story.

Start to write the very beginning of the story. You are not expected to finish
the whole story now. Your writing should be detailed enough that you are only
scratching the surface of the first bullet of your outline. 
Print the name of the chapter when a new chapter begins.Try to write AT
MINIMUM 1000 WORDS. 

${guidelinePrompt}`
        :
        `${authorPrompt}

You have a gripping premise in mind:

${premisePrompt}

Your imagination has crafted a rich narrative outline:

${outlinePrompt}

You've begun to immerse yourself in this world, and the words are flowing.

First, silently review the outline and story so far. Identify what the single
next part of your outline you should write.

Your task is to continue where you left off and write the next part of the story.
You are not expected to finish the whole story now. Your writing should be
detailed enough that you are only scratching the surface of the next part of
your outline. Try to write AT MINIMUM 1000 WORDS. However, once the story
is COMPLETELY finished, write IAMDONE. Print the name of the chapter when a new chapter begins.
Remember, do NOT write a whole chapter right now.

${guidelinePrompt}

Here's what you've written so far:

${storySoFar}`;


    const result = await api.generateContent(combinedPrompt);
    console.log(combinedPrompt + '\n');
    console.log(result);
    return { story: result.response.candidates[0].content.parts[0].text, guideline: guidelinePrompt };
}

async function generateEndingStory(authorPrompt, premisePrompt, outlinePrompt, guidelinePrompt = defaultGuideline, storySoFar = '', debug = false) {
    if (debug) return testPrompts.story;

    const combinedPrompt = `${authorPrompt}

You have a gripping premise in mind:

${premisePrompt}

Your imagination has crafted a rich narrative outline:

${outlinePrompt}

You've been writing this story, and now it's time to bring it to a close.

First, silently review the outline and story so far. Identify what the single
next part of your outline you should write.

Your task is to continue where you left off and write the ending of the story.
Your writing should be detailed enough that you are only scratching the surface of the next part of
your outline. Try to write AT MINIMUM 1000 WORDS. However, once the story
is COMPLETELY finished, write IAMDONE. Print the name of the chapter when a new chapter begins.
Remember, do NOT write a whole chapter right now.

If the story is becoming too long, feel free to summarize the events to reach a satisfying conclusion.

${guidelinePrompt}

Here's what you've written so far:

${storySoFar}`;

    const result = await api.generateContent(combinedPrompt);
    console.log(combinedPrompt + '\n');
    console.log(result);
    return { story: result.response.candidates[0].content.parts[0].text, guideline: guidelinePrompt };
}
module.exports = {
    generateAuthor,
    generatePremise,
    generateOutline,
    generateStory,
    generateEndingStory
};