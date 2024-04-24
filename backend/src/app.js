const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()

// init middleware
app.use(morgan('dev'))
app.use(helmet()) // hide crucial information
app.use(compression()) // compress all responses

// init routes
app.get('/', (req, res) => {
    return res.status(200).json(
        {message: 'Hello World'}
    )
})
module.exports = app