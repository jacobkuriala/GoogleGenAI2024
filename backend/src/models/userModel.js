const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isLoggedIn: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);