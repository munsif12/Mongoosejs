const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, "Name atleast have 4 letters..."],
        maxlength: [25, "Name atmost have 25 letters..."],
        trim: true,
        lowercase: true
    },
    degree: {
        type: String,
        enum: ["bscs", "bsse", "bsit", null],
        //uppercase: true,
        required: true
    },
    semister: {
        type: Number,
        validate(value) {
            if (value <= 1 || value >= 8) {
                throw new error("Semister value is invalid");
            }
        },
        required: [true, "Semister is required..."]
    }
});
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, "Name atleast have 4 letters..."],
        maxlength: [25, "Name atmost have 25 letters..."],
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        uppercase: true,
        required: [true, "Subject is required..."],
        trim: true
    },
    department: {
        type: String,
        //enum: ["bscs", "bsse", "bsit", null],
        uppercase: true,
        required: true
    }
}/*, { versionKey: '_somethingElse' }*/);
const Student = new mongoose.model("studenttable", studentSchema);
const Teacher = new mongoose.model("teachertable", teacherSchema);
module.exports = [Student, Teacher];