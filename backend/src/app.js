const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const storyTeller = require('./storyTeller');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet()); // hide crucial information
app.use(compression()); // compress all responses

// set up authentication  routes
const authRouter = require("./routes/authRouter");
app.use(bodyParser.json());

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

const isAuth = require('./middleware/isAuth');

// routes below this are restricted 
app.use(isAuth);
app.get('/generatestory', async (req, res) => {
    console.log(req.query.prompt);
    const story = await storyTeller.generateStory(req.query.prompt, req.query.audience, req.query.genre);
    console.log(story);
    return res.status(200).json({ story });
});

module.exports = app;