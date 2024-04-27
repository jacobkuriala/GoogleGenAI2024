const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const storyTeller = require('./storyTeller');
const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet()) // hide crucial information
app.use(compression()) // compress all responses

// init db
require('./dbs/init.mongodb')
// init routes
app.get('/', (req, res) => {
    return res.status(200).json(
        { message: 'Hello World' }
    )
});

app.get('/generatestory', async (req, res) => {
    console.log(req.query.prompt);
    const story = await storyTeller.generateStory(req.query.prompt, req.query.audience, req.query.genre);
    console.log(story);
    return res.status(200).json({ story });
});

module.exports = app;