const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./connection/connection");
const userRegistration = require("./schemaModels/schemaModels");
const async = require("hbs/lib/async");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.join(__dirname, "../public")));// defiining path for static files
app.set("view engine", "hbs");//telling express file to set up handle bars which is hbs
app.set("views", path.join(__dirname, "../templets/views"));//insted of looking views folder in look into templetsPath var
hbs.registerPartials(path.join(__dirname, "../templets/partials"))

app.use(express.json());//if the data is comming in json format
app.use(express.urlencoded({ extended: false }));//if the data is comming from url

app.get("/", (req, res) => {
    res.render("index");
});
//user registration
app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/register", async (req, res) => {
    try {
        const userName = req.body.name;
        const password = req.body.pwd;
        const confirmPassword = req.body.cpwd;
        if (password === confirmPassword) {
            const newUser = new userRegistration({
                fullname: req.body.name,
                email: req.body.email,
                password: req.body.pwd
            });
            const userData = await newUser.save();
            console.log(`User registration Data : ${userData}`);
            res.status(201).redirect("/login");
        }
        else
            res.send("password is not matching..")

    } catch (error) {
        console.log(`Error while registering the user : ${error}`);
    }
});
//user login
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.pwd;
        const userData = await userRegistration.findOne({ email: email });
        if (userData.password === password) {
            res.status(201).redirect("/");
        }
        else
            res.send("invalid username or password");
    } catch (error) {
        console.log(`Error while login : ${error}`);
        res.status(400).send(error);
    }
});
app.listen(port, () => {
    console.log(`listenting to the request at ${port}`);
})