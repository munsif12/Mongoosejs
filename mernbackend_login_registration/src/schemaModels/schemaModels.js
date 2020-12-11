const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const webtoken = require("jsonwebtoken");
const async = require("hbs/lib/async");
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});
//data any k bad or save hony sa pahly ya (generateToken ) wala method chalow
//generating tokens for authentication its a middleware
registerUser.methods.gernerateToken = async function () {// .methods is used when you are working with instance of an collection
    try {
        const userToken = await webtoken.sign({ _id: this._id.toString() }, process.env.secret__key);
        console.log(` I am inside tokenGeneration Method`);
        this.tokens = this.tokens.concat({ token: userToken });
        await this.save();
        return userToken;
    } catch (error) {
        console.log(`Error while generating  user  token: ${error}`);
    }
}

//hashing the passwrod before storing in db
registerUser.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 4);
    }
    next();
})
//creating table
const UserRegistration = new mongoose.model("Userregistration", registerUser);
//now wxport the module
module.exports = UserRegistration;