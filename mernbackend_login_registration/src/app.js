const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
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
        const userEmail = req.body.email;
        const password = req.body.pwd;
        const confirmPassword = req.body.cpwd;

        if ([userName, userEmail, password, confirmPassword] != null && password === confirmPassword) {
            //const userHashPassword = await bcrypt.hash(password, 4);1st pram is user value and 2nd is no of rounds the more number of rounds the more security is heigh.
            const newUser = new userRegistration({
                fullname: req.body.name,
                email: req.body.email,
                password: req.body.pwd
            });
            const userData = await newUser.save();
            console.log(`User Registered : ${userData}`);
            res.status(201).redirect("/login");
        }
        else
            res.send("passwords are\'nt matching..")

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
        const userEmail = req.body.email;
        const userPassword = req.body.pwd;
        const userData = await userRegistration.findOne({ email: userEmail });//match if the email exists
        if (userData != null && Object.keys(userData).length > 1) {//if the obj is valid
            if (userData.email && (bcrypt.compare(userData.password, userPassword) || userData.password === userPassword)) {//wether the obj data is valid or not
                res.status(201).redirect("/");
            }
            else
                res
                    .status(404)
                    .send("invalid username or password");
        }
        else
            res
                .status(404)
                .json(
                    { "message": "User not exists check your email and password" }
                );
    } catch (error) {
        console.log(`Error while login : ${error}`);
        res.status(400).send(error);
    }
});
//trying encryption 
const hashingTryUsingBcrypt = async () => {
    const userHashPassword = await bcrypt.hash("tryhash", 8);//1st pram is user value and 2nd is no of rounds the more number of rounds the more security is heigh.
    console.log(userHashPassword);
    if (bcrypt.compare(userHashPassword, "tryhash")) {//.compare is user to compere cipher text with orignal value thid is used in login
        console.log(`true`);
    }
    else console.log(`false`);
}
// ---- end ----hashingTryUsingBcrypt();

//trying JSON WEB TOKEN for user verification after user login once
const jwt = async () => {
    const createdToken = await webtoken.sign({ id: userRegistration.id /* any user data like id nameemail which is use toverify user */ }, "Secret key=>my name is khan "/*secret keyshould be min 32 chars for security*/, { expiresIn: "10 minutes" });
    const verify = await webtoken.verify(createdToken, "Secret key=>my name is khan "/*your secreat key to verify that the user is key becoz the secret key is only known by you */);
    console.log(verify);//eithr true or false
};
//jwt();
// ---- end ---- JSON WEB TOKEN;
app.listen(port, () => {
    console.log(`listenting to the request at ${port}`);
});