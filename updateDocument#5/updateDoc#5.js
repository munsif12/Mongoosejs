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
const updateDoc = async () => {
    try {
        //UpdateOne() methods only tells us how many number of documents are updated .
        //SStudent.UpdateOne({filter},{$set:{WhatToUpdate}},{})
        // const resultUpdateOne = await Student.updateOne({ _id: "5fae4d7214a68e292848a624" }, { $set: { name: "Kazmii" } });
        // console.log(` Result of UpdateOne query :${resultUpdateOne}`);

        //if u want to see whats updated....
        /*
        `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
         */
        //findByIdAndUpdate
        //new true ) is use to display the recently updated data if you dont write it the data will updated in db but will'nt be display in results ...
        const resFindByIdAndUpdate = await Student.findByIdAndUpdate({ _id: "5fae4d7214a68e292848a624" }, { $set: { name: "Kazmii" } }, { new: true, useFindAndModify: false }); //TO get rid of deprecated warning..});
        console.log(` Result of findByIdAndUpdate query :${resFindByIdAndUpdate}`);
    }
    catch (error) {
        console.log(`UpdateOne :${error}`)
    }
}
updateDoc();