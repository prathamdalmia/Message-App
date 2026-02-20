const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const verifyUser = expressAsyncHandler(async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
                res.status(400).json({ message: "No Valid Token Provided" });
                throw new Error("No valid Token Provided".red);
        }
        const token = authHeader.split(" ")[1];

        const decodedUserId = jwt.verify(token, process.env.TOKEN_ACCESS);

        const user = await User.findById(decodedUserId.id).select("-password");

        if (!user) {
                res.status(401);
                throw new Error("User Not Found".red);
        }
        req.user = user;
        next();
});

module.exports = verifyUser;