const asyncHandler = require('express-async-handler');
const Chat = require("../Models/chatModel");
const User = require('../Models/userModel');

const accessChat = asyncHandler(async (req, res) => {
        const { userId } = req.body;
        if (!userId) {
                res.status(400);
                throw new Error("UserID not send with Request");
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
                res.status(400);
                throw new Error("User not Found");
        }
        // console.log(user);

        var isChat = await Chat.find({
                isGroupChat: false,
                $and: [
                        { users: { $elemMatch: { $eq: req.user._id } } },
                        { users: { $elemMatch: { $eq: userId } } },
                ]
        }).populate("users", "-password").populate("latestMessage");

        isChat = await User.populate(isChat, {
                path: "latestMessage.sender",
                select: "name pic email",
        });



        if (isChat.length > 0) {
                res.status(200).json({ chat: isChat });
        } else {
                var chatData = {
                        chatName: "one-one",
                        isGroupChat: false,
                        users: [req.user._id, userId]
                };
                // console.log(chatData);

                try {
                        const createdChat = await Chat.create(chatData);
                        console.log(createdChat);


                        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
                        res.status(200).json({ chat: fullChat });
                } catch (err) {
                        res.status(400);
                        throw new Error(err.message);
                }
        }
});

const fetchChats = asyncHandler(async (req, res) => {
        try {
                const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
                        .populate("users", "-password")
                        .populate("groupAdmin", "password")
                        .populate("latestMessage")
                        .sort({ updatedAt: -1 })
                        .then(async (result) => {
                                result = await User.populate(result, {
                                        path: "latestMessage.sender",
                                        select: "name email pic"
                                });
                        });

                res.status(200).send(chats);
        } catch (err) {
                res.status(500);
                throw new Error("Something went Wrong ");
        }

});

const createGroupChat = asyncHandler(async (req, res) => {

        const { users, name } = req.body;
        if (!users || !name) {
                res.status(400);
                throw new Error("Name or Users not Provided");
        }

        var parsedUsers = JSON.parse(req.body.users);

        if (parsedUsers.length < 1) {
                res.status(400);
                throw new Error("No User Selected");
        }

        parsedUsers.unshift(req.user._id);

        try {
                const groupChat = await Chat.create({
                        chatName: name,
                        isGroupChat: true,
                        users: parsedUsers,
                        groupAdmin: req.user._id
                });

                const fullGroupChat = await groupChat.populate([
                        { path: "users", select: "-password" },
                        { path: "groupAdmin", select: "-password" }
                ]);

                res.status(200).json({ fullGroupChat });
        } catch (err) {
                res.status(500);
                throw new Error("Something Went Wrong");

        }

});

const renameGroup = asyncHandler(async (req, res) => {
        const { chatId, chatName } = req.body;
        /*const group = await Chat.findById(chatId);
        group.chatName = chatName ; group.save();*/

        //better
        const group = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true, runValidators: true })
                .populate([
                        { path: "users", select: "-password" },
                        { path: "groupAdmin", select: "-password" }
                ]);
        if (!group) {
                res.status(404);
                throw new Error("Group not found");
        }

        res.status(200).json({ group });

});

const addToGroup = asyncHandler(async (req, res) => {
        const { chatId, userId } = req.body;

        if (!chatId) {
                res.status(400);
                throw new Error("ChatID not provided");
        }
        if (!userId) {
                res.status(400);
                throw new Error("User not Provided");
        }

        const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true, runValidators: true })
                .populate([
                        { path: "users", select: "-password" },
                        { path: "groupAdmin", select: "-password" }
                ]);

        if (!added) {
                res.status(404);
                throw new Error("Chat not Found");
        }

        res.status(200).json({ group: added })

});

const removeFromGroup = asyncHandler(async (req, res) => {
        const { chatId, userId } = req.body;

        if (!chatId) {
                res.status(400);
                throw new Error("ChatID not provided");
        }
        if (!userId) {
                res.status(400);
                throw new Error("User not Provided");
        }

        const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true, runValidators: true })
                .populate([
                        { path: "users", select: "-password" },
                        { path: "groupAdmin", select: "-password" }
                ]);

        if (!removed) {
                res.status(404);
                throw new Error("Chat not Found");
        }

        res.status(200).json({ group: removed })
});


module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }
