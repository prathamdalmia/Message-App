const express = require('express');
const { sendMessage, allMessages } = require('../Controllers/message.controller');
const verifyUser = require('../Middleware/verifyUser');

const messageRouter = express.Router();

//POST
messageRouter.post("/", verifyUser, sendMessage);

//GET
messageRouter.get("/:chatId", verifyUser, allMessages);




module.exports = messageRouter;