const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const storyTeller = require('./storyTeller');
const storyTeller2 = require('./storyTeller2');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet()); // hide crucial information
app.use(compression()); // compress all responses

// set up authentication  routes
const authRouter = require("./routes/authRouter");
app.use(bodyParser.json({ limit: '100Mb' }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// add authentication endpoints
app.use("/api/auth/", authRouter);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// init db
require('./dbs/init.mongodb');

// init routes
app.get('/', (req, res) => {
    return res.status(200).json(
        { message: 'Hello World' }
    );
});

// const isAuth = require('./middleware/isAuth');

// routes below this are restricted 
// app.use(isAuth);
app.get('/generatestory', async (req, res) => {
    const prompt = "Your hardcoded prompt";
    const audience = "Your hardcoded audience";
    const genre = "Your hardcoded genre";
    const story = await storyTeller.generateStory(prompt, audience, genre);
    console.log(story);
    return res.status(200).json({ story });
});

app.post('/generateauthor', async (req, res) => {
    const authorPrompt = storyTeller2.generateAuthor(req.body.genre, req.body.audience);
    return res.status(200).json({ authorPrompt });
});

app.post('/generatepremise', async (req, res) => {
    const premisePrompt = await storyTeller2.generatePremise(req.body.authorPrompt, req.body.debug);
    return res.status(200).json({ premisePrompt });
});

app.post('/generateoutline', async (req, res) => {
    const outlinePrompt = await storyTeller2.generateOutline(
        req.body.authorPrompt,
        req.body.premisePrompt,
        req.body.debug);
    return res.status(200).json({ outlinePrompt });
});

// creates new story if storySoFar = '' or not provided
// if guidelinePrompt is not provided it uses a default guideline prompt
app.post('/generatestory2', async (req, res) => {
    const { story, guideline } = await storyTeller2.generateStory(
        req.body.authorPrompt,
        req.body.premisePrompt,
        req.body.outlinePrompt,
        req.body.guidelinePrompt,
        req.body.storySoFar,
        req.body.debug);
    // if storySoFar exists then guideline exists in the FE. 
    // Else we return the initial guideline that we used to create the start of the story.
    return req.body.storySoFar ? res.status(200).json({ story }) : res.status(200).json({ story, guideline });
});

module.exports = app;