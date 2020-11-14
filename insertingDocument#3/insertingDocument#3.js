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
//INSERTING THE first document/record/row in the students table
const insertingOnlyOneDocument = async () => {
    try {
        const kazmiiInfo = new Student({
            name: "Kazmii",
            degree: "BSCS",
            semister: 6,
            cgpa: 2.5
        });
        // if u want to check whetther the data is inserted or not so in this case .save() method returns
        //a promise so to handle promise we can use-
        // .then() method but here i am using async await method untill my data get stored..
        //.save() method is use to save one record at a time 
        const res = await kazmiiInfo.save();
        console.log(`Single record insertion : ${res}`);
    }
    catch (error) {
        console.log(`Error Single Record : ${error}`)
    }
}
insertingOnlyOneDocument();


//inserting multiple records at once.
const insertingMultiplesDocument = async () => {
    try {
        const jawadInfo = new Student({
            name: "Jawad",
            degree: "BSCS",
            semister: 6,
            cgpa: 2.7
        });
        const arslanInfo = new Student({
            name: "Arslan",
            degree: "BSCS",
            semister: 6,
            cgpa: 3.35
        });
        const ridaInfo = new Student({
            name: "Rida",
            degree: "BSCS",
            semister: 6,
            cgpa: 3.8
        });
        const wardaInfo = new Student({
            name: "Warda",
            degree: "BSCS",
            semister: 6,
            cgpa: 3.10
        });
        const howraInfo = new Student({
            name: "Howra",
            degree: "BSCS",
            semister: 6,
            cgpa: 3.22
        });
        //insertMany takes an array of records.
        //to insert we use the table name not the record name as we did to insert the single record like (wardaInfo.save())
        //but to insert multi records we use tableName.inseryMany function like (student.insertMany[arrayOfRecords])
        const result = Student.insertMany([jawadInfo, arslanInfo, ridaInfo, wardaInfo, howraInfo]);
        console.log(`Multiples records insertions : ${result}`);
    }
    catch (error) {
        console.log(`Error Multi Records : ${error}`)
    }
}
insertingMultiplesDocument();
