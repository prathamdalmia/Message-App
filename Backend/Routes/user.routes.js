const express = require('express');
const { registerUser } = require('../Controllers/user.controller');

const userRouter = express.Router();

userRouter.post("/signup", registerUser)


module.exports = userRouter;