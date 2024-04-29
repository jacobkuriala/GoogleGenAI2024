const bcrypt = require("bcryptjs");
const UserDao = require("../daos/UserDao");
const jwt = require("jsonwebtoken");

exports.postRegister = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    try {
        const exsitUser = await UserDao.findUserByEmail(email);
        if (exsitUser) {
            const error = new Error(
                "Eamil already exist, please pick another email!"
            );
            res.status(409).json({
                error: "Eamil already exist, please pick another email! ",
            });
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserDao.createUser(fullname, email, hashedPassword);
        res.status(200).json({
            message: "User created",
            user: { id: result._id, email: result.email },
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UserDao.findUserByEmail(email);

        if (!user) {
            const error = new Error("user with this email not found!");
            error.statusCode = 401;
            throw error;
        }

        const comparePassword = bcrypt.compare(password, user.password);

        if (!comparePassword) {
            const error = new Error("password is not match!");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ email: user.email }, "expressnuxtsecret", {
            expiresIn: "20m", // it will expire token after 20 minutes and if the user then refresh the page will log out
        });
        UserDao.updateUserLoggedInStatus(user.email, true);
        res.status(200).json({ token: token });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postLogout = async (req, res, next) => {
    const user = await UserDao.findUserByEmail(req.email);
    UserDao.updateUserLoggedInStatus(user.email, false);
    res.status(200).json({
        user: {
            fullname: user.fullname
        },
    });
}

exports.getUser = async (req, res, next) => { // this function will send user data to the front-end as I said above authFetch on the user object in nuxt.config.js will send a request and it will execute
    const user = await UserDao.findUserByEmail(req.email);
    res.status(200).json({
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
        },
    });
};