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
app.post("/students", (req, res) => {
    console.log(req.body);
    const newStudent = new Student(req.body);
    newStudent.save().then(() => {
        console.log("data inserted");
        res.status(201).send(newStudent);
    }).catch(e => {
        res.status(400).send(newStudent);
        console.log(`Error while saving data into DB : ${e}`);
    })

});
app.listen(port, (req, res) => {
    console.log(`listing to the port ${port}`);
});