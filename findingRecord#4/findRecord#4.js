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
//finding the document..
const findingDocument = async () => {
    try {
        const result = await Student.find({ name: "Kazmii" });//return promise thts why await is used
        console.log(` Result :${result}`);
        /*
        MONGODB COMPARISION OPERATORS :- all these operators are used with find Method like: db.doc.find()
        1=> ( $gt > greater then ), 2=> ( $ed == equal to ) , 3=> ( $gte >= greater the equalto )
        4=> ( $lt < less then ) 5=> ($ite <= less then equalto) 6=> ( $ne != not equalto )
        6=> The $in operator selects the documents where the value of a field equals any value in the specified array.
        { field: { $in: [<value1>, <value2>, ... <valueN> ] } } 
        7=> $nin selects the documents where the field value is not in the specified array or the field does not exist.
        db.inventory.find( { qty: { $nin: [ 5, 15 ] } } )
        */
        const res$gt = await Student.find({ cgpa: { $gt: 3.0 } });
        console.log(` Result of $gt operator :${res$gt}`);
        const res$in = await Student.find({ name: { $in: ["Munsif", "Kazmii"] } });
        console.log(` Result of $in operator :${res$in}`);

    } catch (error) {
        console.log(`error : ${error}`);
    }

}
findingDocument();