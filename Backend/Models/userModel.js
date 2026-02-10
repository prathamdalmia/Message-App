const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
        name: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                unique: true,
                required: true,
        },
        password: {
                type: String,
                required: true,
        },
        pic: {
                type: String,
                // default: "https://img.freepik.com/premium-vector/anonymous-user-flat-icon-vector-illustration-with-long-shadow_520826-1932.jpg" ,
                default: "../Assets/anonymous_user.jpg",
        }
}, { timestamps: true, });

const User = mongoose.model("User", userModel);

module.exports = User;