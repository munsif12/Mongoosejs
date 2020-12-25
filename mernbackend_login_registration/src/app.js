require("dotenv").config();
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const webtoken = require("jsonwebtoken");
const hbs = require("hbs");
const request = require("request");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/covid19", (req, res) => {
    res.render("covidCasesProject");
});
app.get("/currencyConvertor", (req, res) => {
    res.render("currencyConvertor");
});
//user registration
app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/welcomePage", (req, res) => {
    res.render("welcomePage");
});
app.get("/getAllUsers", async (req, res) => {
    try {
        const students = await userRegistration.find();
        console.log(students);
        const userNames = students.map(({ fullname }) => {//return us an array
            return fullname;
        });
        // res.json({ userNames });r
        res.send(`<h1 style="text-align:center;">Users Registered With Us</h1> <table style="width:100%; border:1px solid black; border-collapse:collapse;">
        <tr style="border:1px solid black;">
        <th style=" font-size:22px;">Names</th>
            <td style="text-align:center; font-size:18px; border:1px solid black;">${[...userNames]}
            </td>
        </tr>
    </table>`);
    } catch (error) {

    }

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
            const tokenResult = await newUser.gernerateToken();
            if (tokenResult != null) {
                res.cookie("firstCookie", tokenResult, {
                    expires: new Date(Date.now() + 200000),
                    httpOnly: true
                });
                console.log(`successfull registration with token :${tokenResult}`);
                const userData = await newUser.save();
                console.log(`User Registered : ${userData}`);
                res.status(201).redirect("/login");
            }
            else
                res.status(500).send("error while generating user tokens");
        }
        else
            res.send("passwords are\'nt matching..");

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
        const truePass = await bcrypt.compare(userPassword, userData.password);
        console.log(`bcrypt result ${truePass}`);
        if (userData != null && Object.keys(userData).length > 1) {//if the obj is valid
            // console.log(userData);
            // console.log(userData.password + " ------ " + userPassword);
            if (truePass || userData.password === userPassword) {//wether the obj data is valid or not
                const tokenResult = await userData.gernerateToken();
                res.cookie("logincookie", tokenResult, {
                    expires: new Date(Date.now() + 500000),
                    httpOnly: true
                    // secure:true => only run when url type is https 
                });
                console.log(tokenResult);
                res.status(201).redirect("welcomePage");
            }
            else
                res.status(404).send("invalid password");
        }
        else
            res.status(404).json(
                { "message": "User not exists check your email and password" }
            );
    } catch (error) {
        console.log(`Error while login : ${error}`);
        res.status(400).send(error);
    }
});
//food nutrition project
app.get("/foodNutrition", (req, res) => {
    var data;
    if (req.body.food = "banana") {
        const url = {
            method: 'GET',
            url: 'https://rapidapi.p.rapidapi.com/parser',
            qs: { ingr: `${req.body.food}` },
            headers: {
                'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
                'x-rapidapi-key': '1f98988481mshaf71d0b16041b35p14a73cjsn1e20a5387d6d',
                useQueryString: true
            }
        };

        request(url, function (error, response, body) {
            if (error) throw new Error(error);
            var useableData = JSON.parse(body);
            data = [useableData];
            console.log(data[0].parsed[0].food.nutrients);
            console.log(data[0].parsed[0].food.image);
            // console.log(readFile.replace("{%PROCNT%}", (data[0].parsed[0].food.nutrients.Enerc_Kcal)));
            // readFile.replace("{%PROCNT%}", (data[0].parsed[0].food.nutrients.Enerc_Kcal));
            res.render("foodNutrition", {
                imageUrl: `${data[0].parsed[0].food.image}`,
                lable: `${data[0].parsed[0].food.label}`,
                Enerc_Kcal: `${data[0].parsed[0].food.nutrients.ENERC_KCAL}`, //${data[0].parsed[0].food.uri.nutrients}
                PROCNT: `${data[0].parsed[0].food.nutrients.PROCNT}`,
                FAT: `${data[0].parsed[0].food.nutrients.FAT}`,
                CHOCDF: `${data[0].parsed[0].food.nutrients.CHOCDF}`
            });
        });
    }
});
//trying encryption 
const hashingTryUsingBcrypt = async () => {
    const userHashPassword = await bcrypt.hash("1234", 4);//1st pram is user value and 2nd is no of rounds the more number of rounds the more security is heigh.
    // console.log(userHashPassword);
    if (bcrypt.compare("$2a$04$rUWrr8kjkoGHDCkSsKOb8Opj3th9Wp1dfTmWuHxEOboyN5AtuMdLC", "1234")) {//.compare is user to compere cipher text with orignal value thid is used in login
        // console.log(`true`);
    }
    else { }
    //  console.log(`false`);
}
// ---- end ----hashingTryUsingBcrypt();
hashingTryUsingBcrypt();
//trying JSON WEB TOKEN for user verification after user login once
const jwt = async () => {
    const createdToken = await webtoken.sign({ id: userRegistration.id /* any user data like id nameemail which is use toverify user */ }, "Secret key=>my name is khan "/*secret keyshould be min 32 chars for security*/, { expiresIn: "10 minutes" });
    const verify = await webtoken.verify(createdToken, "Secret key=>my name is khan "/*your secreat key to verify that the user is key becoz the secret key is only known by you */);
    console.log(verify);//eithr true or false
};
// jwt();
// ---- end ---- JSON WEB TOKEN;
app.listen(port, () => {
    console.log(`listenting to the request at ${port}`);
});