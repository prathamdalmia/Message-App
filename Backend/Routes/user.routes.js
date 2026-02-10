const express = require('express');
const { registerUser, authUser } = require('../Controllers/user.controller');

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", authUser);


module.exports = userRouter;