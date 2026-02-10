const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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


userSchema.pre('save', async function (next) {
        if (!this.isModified) { next(); }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
}
const User = mongoose.model("User", userSchema);

module.exports = User;