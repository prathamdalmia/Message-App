const express = require('express');
const { registerUser, authUser, allUser } = require('../Controllers/user.controller');
const verifyUser = require('../Middleware/verifyUser');

const userRouter = express.Router();

//POST
userRouter.post("/", authUser);
userRouter.post("/signup", registerUser);

//GET
userRouter.get("/search", verifyUser, allUser);

//PUT


//DELETE



module.exports = userRouter;