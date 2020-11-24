const express = require("express");
require("./dbConnection/conn");
const Student = require("./studemtsModel/models");
const port = process.env.PORT || 8000;
const app = express();
//middle ware
/*
    express.json() is use to recognize incoming requeest object as a JSON object 
    This method is called a middleware to use this use app.use(express.json())
    */
app.use(express.json());
//routing 
app.get("/", (req, res) => {
    res.send("this is home page..");
});
//handelling post request and using .then() and .catch() to handle the promise. 
app.post("/students", (req, res) => {
    console.log(req.body);
    const newStudent = new Student(req.body);
    newStudent.save().then(() => {
        console.log("data inserted");
        res.status(201).send(newStudent);
    }).catch(e => {
        res.status(400).send(newStudent);
        console.log(`Error while saving data into DB : ${e}`);
    });

});
//handelling get request and using ASYNC AWAIT to handle the promise..
//getting all the student data in the database..
app.get("/students", async (req, res) => {
    try {
        const studentResult = await Student.find();
        console.log(studentResult);
        res.status(201).send(studentResult);
    } catch (error) {
        console.log(`error while getting the result.. : ${error}`);
        res.status(400).send(error);
    }
});
//getting the user data by his id...
app.get("/students/:id", async (req, res) => {
    try {
        let urlData = req.params.id;
        console.log(urlData);
        const singleStudetnRecord = await Student.findById({ _id: `${urlData}` });
        if (!singleStudetnRecord) {
            return res.status(404).send("Student not exists...");
        }
        else res.send(singleStudetnRecord);
    } catch (error) {
        console.log(`error while getting single record of student.. : ${error}`);
        res.status(400).send(error);
    }
});

//getting the user data by his name
/*
app.get("/students/:name", async (req, res) => {
    try {
        let urlData = req.params.name;
        console.log(urlData);
        const singleStudetnRecordByName = await Student.find({ name: `${urlData}` });
        console.log("after check :" + singleStudetnRecordByName);
        if (!singleStudetnRecordByName) {
            return res.status(404).send("Student is not available");
        }
        else res.send(singleStudetnRecordByName);
    } catch (error) {
        console.log(`error while getting single record of student.. : ${error}`);
        res.status(400).send(error);
    }
});
*/

//deleting student by id
app.delete("/students/:id", async (req, res) => {
    try {
        const deletedResult = await Student.findByIdAndDelete(req.params.id);
        console.log(deletedResult);
        if (!deletedResult) {
            return res.status(400).send("bad request..");
        }
        res.status(200).send(deletedResult);
        console.log("data deleted...");
    } catch (error) {
        console.log(`error deleting student.. : ${error}`);
        res.status(500).send("bad request..");
    }
});
app.patch("/students/:id", async (req, res) => {
    try {
        const dataFromBody = await req.body;
        const id = req.params.id;
        console.log(dataFromBody);
        const updatedResult = await Student.findByIdAndUpdate({ _id: id }, dataFromBody, { new: true, useFindAndModify: false });
        //if (!updatedResult) {
        //return res.status(400).send("bad request..");
        //}
        //console.log(updatedResult);
        console.log("data updated")
        res.send(updatedResult);
    } catch (error) {
        console.log(`error updating students... : ${error}`);
        res.status(500).send("bad request..");
    }
});
app.listen(port, (req, res) => {
    console.log(`listing to the port ${port}`);
});