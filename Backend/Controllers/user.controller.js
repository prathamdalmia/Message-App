const asyncHandler = require('express-async-handler');
const User = require("../Models/userModel");
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password, pic } = req.body;

        if (!name || !email || !password) {
                res.status(400);
                throw new Error("Please Enter All The Fields ");
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
                res.status(400);
                throw new Error("User Already Existes ");
        }

        const user = await User.create({
                name,
                email,
                password,
                pic,
        });

        if (user) {
                res.status(200).json({ token: generateToken(user._id), message: "Signed Up Successfully" });
        } else {
                res.status(500);
                throw new Error("Something Went Wrong");
        }
});


const authUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
                res.status(400);
                throw new Error("Please Enter All The Fields");
        }

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password)) && user.name === name) {
                res.status(200).json({ token: generateToken(user._id), message: "Logged In Successfully" })
        } else {
                res.status(400);
                throw new Error("Invalid Email or Password");
        }


});



const allUser = asyncHandler(async (req, res) => {
        // console.log(req.user);
        const keyword = req.query.search ? {
                $or: [
                        { name: { $regex: req.query.search, $options: "i" } },
                        { email: { $regex: req.query.search, $options: "i" } }
                ]
        } : {}
        const users = await User.find({ ...keyword, _id: { $ne: req.user._id } })

        res.status(200).json(users)
})

module.exports = { registerUser, authUser, allUser }