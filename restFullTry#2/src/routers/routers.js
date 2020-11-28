const express = require("express");
const [Student, Teacher] = require("../schema_Models/schemas_models");
const routes = express.Router();

/* --- START Create student/teaacher --- */
routes.post("/student", async (req, res) => {
    try {
        const newStudent = await new Student(req.body);
        console.log(`new Student data :${newStudent}`);
        newStudent.save(newStudent);//mistake bcoz .save() return the promise use await or use .then to handle the promise and then sow the result. 
        res.status(201).send(newStudent);
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
        res.status(201).send(newTeacher);
        console.log("Data entered successfully...");
    } catch (error) {
        console.log(`Error while inserting data : ${error}`);
        res.status(400).send(newTeacher);
    }
});
/* --- END Create student/teaacher --- */

/* --- START Get all the data available inside the table for student/teaacher --- */
routes.get("/student", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.status(200).send(studentsData);
        console.log(`Student data shown successfully..`);
    } catch (error) {
        console.log(`Error wile getting the student data : ${error}`);
        res.status(400).send();
    }
});
routes.get("/teacher", async (req, res) => {
    try {
        const teacherData = await Teacher.find();
        res.status(200).send(teacherData);
        console.log(`Teacher Data shown successfully..`);
    } catch (error) {
        console.log(`Error wile getting the student data : ${error}`);
        res.status(400).send();
    }
});
/* --- END get all the data available inside the table for student/teaacher --- */

/* --- START find by id --- */
routes.get("/student/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentsData = await Student.find({ _id: studentId });
        res.send(studentsData);
        console.log(`Studetn data shown successfully..`);
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
            res.send("Teacher id is invalid...")
        }
        res.send(teacherData);
        console.log(`Teacher data shown successfully..`);
    } catch (error) {
        console.log(`Error wile getting the student data : ${error}`);
        res.status(400).send("Teacher id is invalid plz...")
    }
});
/* --- END find by id --- */

/* --- START Update student/teaacher --- */
routes.patch("/student/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentBodyData = req.body;
        const studentUpdatedData = await Student.findByIdAndUpdate({ _id: studentId }, studentBodyData, { new: true, useFindAndModify: true });//works like this => { _id:"32424"},{name:"xyx"}
        res.status(201).send(studentUpdatedData);
        console.log("Student data Updated ...");
    } catch (error) {
        console.log(`Error wile Updating the student data : ${error}`);
        res.status(400).send("Student id is invalid ...")
    }
});
routes.patch("/teacher/:id", async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacherBodyData = req.body;
        const teacherUpdatedData = await Teacher.findByIdAndUpdate({ _id: teacherId }, teacherBodyData, { new: true, useFindAndModify: true });//works like this => { _id:"32424"},{name:"xyx"}
        res.status(201).send(teacherUpdatedData);
        console.log("Teacher data Updated ...");
    } catch (error) {
        console.log(`Error wile Updating the Teacher data : ${error}`);
        res.status(400).send("Teacher id is invalid ...")
    }
});
/* --- End Update student/teaacher --- */
/* --- START Delete student/teaacher --- */
routes.delete("/student/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentBodyData = req.body;
        const studentUpdatedData = await Student.findByIdAndDelete({ _id: studentId });
        res.send(studentUpdatedData);
        console.log("Student data deleted..");
    } catch (error) {
        console.log(`Error wile Updating the student data : ${error}`);
        res.status(400).send("Student id is invalid ...");
    }
});
routes.delete("/teacher/:id", async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacherBodyData = req.body;
        const teacherUpdatedData = await Teacher.findByIdAndUpdate({ _id: teacherId }, teacherBodyData, { new: true });//works like this => { _id:"32424"},{name:"xyx"}
        res.send(teacherUpdatedData);
        console.log("Teacher data deleted..");
    } catch (error) {
        console.log(`Error wile Updating the Teacher data : ${error}`);
        res.status(400).send("Teacher id is invalid ...")
    }
});
module.exports = routes;