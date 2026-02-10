const asyncHandler = require('express-async-handler');
const User = require("../Models/userModel");
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password, pic } = req.body;

        if (!name || !email || !password) {
                res.status(400).json({ message: "Please enter all the fields" });
                throw new Error("Please Enter All The Fields ".red);
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
                res.status(400).json({ message: "User Already Exists" });
                throw new Error("User Already Existes ".red);
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
                res.status(500).json({ message: "User Aready Existes" });
                throw new Error("User Already Existes ".red);
        }
});


const authUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
                res.status(400).json({ message: "Please enter all the fields" });
                throw new Error("Please Enter All The Fields ".red);
        }

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password)) && user.name === name) {
                res.status(200).json({ token: generateToken(user._id), message: "Logged In Successfully" })
        } else {
                res.status(500).json({ message: "Invalid Email or Password" });
                throw new Error("Invalid Email or Password ".red);
        }


});

module.exports = { registerUser, authUser }