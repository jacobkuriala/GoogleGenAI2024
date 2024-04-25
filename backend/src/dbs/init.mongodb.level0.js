"use strict"
require('dotenv').config();
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGODB_URI
mongoose.connect(MONGO_URI).then(_ => {
    console.log('MongoDB connected')
}).catch(err => {
    console.log(err)
})

module.exports = mongoose