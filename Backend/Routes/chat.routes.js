const express = require('express');
const { accessChat, createGroupChat, fetchChats, renameGroup, addToGroup, removeFromGroup } = require('../Controllers/chat.controller');
const verifyUser = require('../Middleware/verifyUser');

const chatRouter = express.Router();

//POST
chatRouter.post("/", verifyUser, accessChat);
chatRouter.post("/group", verifyUser, createGroupChat);

//GET
chatRouter.get("/", verifyUser, fetchChats);

//PUT
chatRouter.put("/rename", verifyUser, renameGroup);
chatRouter.put("/addgroup", verifyUser, addToGroup);
chatRouter.put("/groupremove", verifyUser, removeFromGroup);


//DELETE



module.exports = chatRouter;