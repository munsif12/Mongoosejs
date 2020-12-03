const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./connection/connection");
const userRegistration = require("./schemaModels/schemaModels");
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
            res.status(201).send(userData);
        }
        else
            res.send("password is not matching..")

    } catch (error) {
        console.log(`Error while registering the user : ${error}`);
    }
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.listen(port, () => {
    console.log(`listenting to the request at ${port}`);
})