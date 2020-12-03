const mongoose = require("mongoose");
const validator = require("validators");
//creating schema for user registration
const registerUser = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Name is required..."],
        minlength: [4, "Name must be 4 characters..."],
        maxlength: [25, "Name is greater then 25 characters..."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "email already exists."],
        // validate(value) {
        //     if (!check(value).isEmail) {
        //         throw new error("Email is invalid...");
        //     }
        // },
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});
//creating table
const UserRegistration = new mongoose.model("Userregistration", registerUser);
//now wxport the module
module.exports = UserRegistration;