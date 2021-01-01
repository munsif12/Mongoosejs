const mongoose = require("mongoose");

//schema for user feedback
const Feedback = new mongoose.Schema({
    name: {
        type: String,
        minlength: [4, "Message must be greate then 4 chars"],
        required: [true, "Message is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "email already exists."],
    },
    contectUs: {
        type: String,
        // required: [true, "Contect is required"],
        trim: true
    },
    message: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "email already exists."],
        trim: true,
        minlength: [4, "Message must be 4 characters..."],
        maxlength: [125, "Message is greater then 25 characters..."]
    }
});

//creating table for user
const userFeedback = new mongoose.model("userFeedback", Feedback);
// exporting the userschemaTable
module.exports = userFeedback;