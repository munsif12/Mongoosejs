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
        //LOGICAL OPERATORS
        /* 1=> ($or ) Student.find({ $or :[ { name:"Jawad" },{name:"Warda"} ] }); pass array of objects
           2=> ( $and ) Student.find({ $and: [{ name: "Hamza" }, { cgpa: { $gte: 3.3 } }] }); where name is hamza 
           and cgpa is greater then 2.9
           3=> ( $not )  Student.find({ $and: [{ name: "Hamza" }, { cgpa: { $not: { $gte: 3.3 } } }] });
           where name is hamza and cgpa is not greater then 3.3
        */
        const res$or = await Student.find({ $or: [{ name: "Jawad" }, { name: "notExists..." }] });
        console.log(` Result of $or operator :${res$or}`);

        const res$and = await Student.find({ $and: [{ name: "Hamza" }, { cgpa: { $gte: 3.3 } }] });
        console.log(` Result of $and operator ** Result is 0 bcoz query doesnt match to any data... :${res$and}`);

        const res$not = await Student.find({ $and: [{ name: "Hamza" }, { cgpa: { $not: { $gte: 3.3 } } }] });
        console.log(` Result of $not operator :${res$not}`);

        //SELECT , SORTING ,LINIT AND COUNT METHODS 
        const res$select = await Student.find({ $or: [{ name: "Munsif" }, { name: "Kazmii" }] }).select({ name: 1 });
        console.log(` Result of res$select operator :${res$select}`);

        const res$count = await Student.find({ $or: [{ name: "Munsif" }, { name: "notExists..." }] }).select({ name: 1 }).countDocuments();
        console.log(` Result of res$count operator :${res$count}`);

        const res$sort = await Student.find().select({ name: 1 }).sort({ cgpa: -1 }).limit(5); // 1 for ascending order and -1 for decending
        console.log(` Result of res$sort operator :${res$sort}`);

    } catch (error) {
        console.log(`error : ${error}`);
    }

}
findingDocument();