const jwt = require("jsonwebtoken");
const UserDao = require("../daos/UserDao");

module.exports = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Not authenticated." });
        throw unauthenticatedError();
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "expressnuxtsecret");
    } catch (err) {
        return res.status(500).json({ message: "Not authenticated." });
    }
    if (!decodedToken) {
        return res.status(401).json({ message: "Not authenticated." });
    }
    const user = await UserDao.findUserByEmail(decodedToken.email);
    if (!user.isLoggedIn) {
        return res.status(401).json({ message: "Not authenticated." });
    }
    req.email = decodedToken.email;
    next();
};
