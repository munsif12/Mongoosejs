const mongoose = require("mongoose");
const validator = require("validator");
const { __esModule } = require("validator/lib/isAlpha");

//creating student schema
const studentTableSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required..."],
        minlength: [4, "Username must be of 4 letters..."],
        maxlength: [25, "Username must be less then 25 letters.."]
    },
    semister: {
        type: Number,
        validate(value) {
            if (value < 0 || value > 8) {
                throw new error("Semister should be > 0 and < then 8...");
            }
        },
        required: [true, "Semister is required..."],
    },
    degree: {
        type: String,
        //enum: ["bscs", "bsse", "bsit", null],
        uppercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required..."],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("Email is invalid...");
            }
        },
        unique: [true, "Email already exists..."]
    },
    cgpa: {
        type: Number,
        validate(val) {
            if (val < 1.5 || val > 4) {
                throw new error("Cgpa must be > then 1.5 and < 4 ...");
            }
        },
        required: [true, "Cgpa is required..."]
    }
});
//creating a collection/table
const Student = new mongoose.model("studentTableRestfulApi", studentTableSchema);
//exporting the studetn mmodel
module.exports = Student; 