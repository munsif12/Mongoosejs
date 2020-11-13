const { Schema } = require("mongoose");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/firstTryMongoose", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection connected successfully...");
    })
    .catch(err => {
        console.log(`Connection error ${err}...`);
    });
//a mongoose schema is use to define the structure of the document like column name ,types,their default values ,
//validators etc
//creating Schema for student collections
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        default: "BSCS",
        required: true
    },
    semister: Number,
    cgpa: Number,
    date: {
        type: Date,
        default: Date.now
    }
});
//mongoose model provides iterface to the database for CRUD operations,
//simply means creating the /collections

//creating collection using models
//basically we are creating a class of studnet 
const Student = new mongoose.model("Student", studentSchema);