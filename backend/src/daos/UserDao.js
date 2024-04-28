const userModel = require("../models/userModel");

async function createUser(fullname, email, hashedPassword) {
    const user = new userModel({
        fullname: fullname,
        email: email,
        password: hashedPassword,
    });
    return await user.save();
}

async function findUserByEmail(email) {
    return await userModel.findOne({ email: email });
}

async function updateUserLoggedInStatus(email, isLoggedIn) {
    return await userModel.updateOne({ email: email }, { isLoggedIn: isLoggedIn });
}

module.exports = {
    findUserByEmail,
    updateUserLoggedInStatus,
    createUser
}