const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/firstTryMongoose", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection created...")
    })
    .catch(err => {
        console.log(`Connection error ${err}...`);
    });
//SCHEMA of the table
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
//MODEL
//basically we are creating a class of studnet 
const Student = new mongoose.model("Student", studentSchema);

//UPDATING the document..
const deleteDoc = async () => {
    try {
        //delteOne() we can use deleteone but it return how many lines are deleted insted of showing data ..so for that we are using findByIdAndDelete()
        //const resDelete = await Student.findByIdAndDelete({ _id: "5fae46b753cd53213434c649" }); this statment is used
        const resDelete = await Student.findByIdAndDelete({ _id: "5fb00cc54b687d185061b876" });
        console.log(` Result of resDelete query :${resDelete}`);

    }
    catch (error) {
        console.log(`UpdateOne :${error}`)
    }
}
deleteDoc();