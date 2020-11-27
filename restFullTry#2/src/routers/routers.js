const express = require("express");
const [Student, Teacher] = require("../schema_Models/schemas_models");
const routes = express.Router();
routes.post("/student", async (req, res) => {
    try {
        const newStudent = await new Student(req.body);
        console.log(`new Student data :${newStudent}`);
        newStudent.save(newStudent);//mistake bcoz .save() return the promise use await or use .then to handle the promise and then sow the result. 
        res.status(200).send(newStudent);
        console.log("Data entered successfully...");
    } catch (error) {
        console.log(`Error while inserting data : ${error}`);
        res.send("this is home..");
    }
});
routes.post("/teacher", async (req, res) => {
    try {
        const newTeacher = await new Teacher(req.body);
        console.log(`new Teacher data :${newTeacher}`);
        newTeacher.save(newTeacher);
        res.status(200).send(newTeacher);
        console.log("Data entered successfully...");
    } catch (error) {
        console.log(`Error while inserting data : ${error}`);
        res.status(400).send(newTeacher);
    }
});
routes.get("/student", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.status(200).send(studentsData);
        console.log(`Data shown successfully..`);
    } catch (error) {
        console.log(`Error wile getting the student data : ${error}`);
        res.status(400).send();
    }
});
routes.get("/teacher", async (req, res) => {
    try {
        const teacherData = await Teacher.find();
        res.status(200).send(teacherData);
        console.log(`Data shown successfully..`);
    } catch (error) {
        console.log(`Error wile getting the student data : ${error}`);
        res.status(400).send();
    }
});
routes.get("/student/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentsData = await Student.find({ _id: studentId });
        res.status(200).send(studentsData);
        console.log(`Data shown successfully..`);
    } catch (error) {
        console.log(`Error wile getting the student data : ${error}`);
        res.status(400).send("Student id is invalid plz...")
    }
});
routes.get("/teacher/:id", async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacherData = await Teacher.find({ _id: teacherId });
        if (teacherData === []) {
            res.status(500).send("Teacher id is invalid...")
        }
        res.status(200).send(teacherData);
        console.log(`Data shown successfully..`);
    } catch (error) {
        console.log(`Error wile getting the student data : ${error}`);
        res.status(400).send("Teacher id is invalid plz...")
    }
});
module.exports = routes;