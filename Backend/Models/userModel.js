const mongoose = require("mongoose");

const userModel = mongoose.schema({
        name: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true,
        },
        password: {
                type: String,
                required: true,
        },
        pic: {
                type: String,
                required: true,
                // default: "https://img.freepik.com/premium-vector/anonymous-user-flat-icon-vector-illustration-with-long-shadow_520826-1932.jpg" ,
                default: "../Assets/anonymous_user.jpg",
        }
}, { timestamps: true, });

const User = mongoose.model("User", userModel);

module.exports = User;