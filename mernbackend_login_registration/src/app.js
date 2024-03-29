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
const userFeedback = require("./schemaModels/userFeedbackSchema");
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
app.post("/welcomePage", async (req, res) => {
    try {
        const userName = req.body.name;
        const userEmail = req.body.email;
        const userContectInfo = req.body.contectInfo;
        const userMessage = req.body.message;

        if (userName !== "" && userEmail !== "" && userContectInfo !== "" && userMessage !== "") {
            const newFeedback = new userFeedback({
                name: userName,
                email: userEmail,
                contectUs: userContectInfo,
                message: userMessage
            });
            const userSaved = await newFeedback.save();
            if (userSaved != null) {
                res.status(201).send(" Your feedback has been saved Thanks");
            }
            else
                res.status(500).send(" Your feedback hasen't been saved Try again");
        }
        else
            res.status(500).send(" Your feedback can't be empty Try again");

    } catch (error) {
        console.log(`Error while getting user Feedback  : ${error}`);
    }
});

app.get("/getAllUsers", async (req, res) => {
    try {
        const students = await userRegistration.find();
        console.log(students);
        const userNames = students.map(({ fullname }) => {//return us an array
            return fullname;
        });
        // res.json({ userNames });r
        res.send(`<h1 style="text-align:center;color:blue;">Users Registered With Us</h1> <table style="width:100%; border:1px solid black; border-collapse:collapse;">
        <tr style="border:1px solid black;">
        <th style=" font-size:22px;">Names</th>
            <td style="text-align:center; font-size:18px; border:1px solid black;">${[...userNames]}
            </td>
        </tr>
    </table>`);
    } catch (error) {
        console.log(`Error while getting all registered users : ${error}`);
    }
});
const arrayOfNames = [];
const feedbackArray = [];
app.get("/userFeedbacks", async (req, res) => {
    try {
        const usersFeedbacks = await userFeedback.find();
        // res.status(200).json(usersFeedbacks);
        const userNames = usersFeedbacks.map(({ name }) => {//return us an array
            return name;
        });
        for (let i = 0; i < userNames.length; i++) {
            arrayOfNames[i] = userNames[i];
        }

        const feedback = usersFeedbacks.map(({ message }) => {//return us an array
            return message;
        });
        for (let i = 0; i < feedback.length; i++) {
            feedbackArray[i] = feedback[i];
        }

        console.log(...arrayOfNames);//to check wether working or not
        console.log(...feedbackArray);//to check wether working or not

        res.render("userFeedback", {
            name_one: arrayOfNames[0],
            feedback_one: feedbackArray[0],

            name_two: arrayOfNames[1],
            feedback_two: feedbackArray[1],

            name_three: arrayOfNames[2],
            feedback_three: feedbackArray[2],

            name_four: arrayOfNames[3],
            feedback_four: feedbackArray[3],

            name_five: arrayOfNames[4],
            feedback_five: feedbackArray[4],

            name_six: arrayOfNames[5],
            feedback_six: feedbackArray[5],
        })
    } catch (error) {
        console.log("Error while getting users feedback")
        res.status(500).send("Error while getting users feedback");
    }
})
app.post("/register", async (req, res) => {
    try {
        const userName = req.body.name;
        const userEmail = req.body.email;
        const password = req.body.pwd;
        const confirmPassword = req.body.cpwd;

        if ([userName, userEmail, password, confirmPassword] != null && password === confirmPassword) {
            //const userHashPassword = await bcrypt.hash(password, 4);1st pram is user value and 2nd is no of rounds the more number of rounds the more security is heigh.
            const newUser = new userRegistration({ //creating new user with given info
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
                const userData = await newUser.save();//save user to db
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
        console.log(`passwrod is : ${userPassword}`);
        const userData = await userRegistration.findOne({ email: userEmail });//match if the email exists
        const truePass = await bcrypt.compare(userPassword, userData.password);
        console.log(`bcrypt result ${truePass}`);
        if (userData != null && Object.keys(userData).length > 1) {//if the obj is valid
            console.log(userData);
            // console.log(userData.password + " ------ " + userPassword);
            if (truePass || userData.password === userPassword) {//wether the obj data is valid or not
                const tokenResult = await userData.gernerateToken();
                res.cookie("logincookie", tokenResult, {
                    expires: new Date(Date.now() + 500000),
                    httpOnly: true
                    // secure:true => only run when url type is https 
                });
                console.log(tokenResult);
                // trying to get username but not working
                // res.status(201).render("welcomePage", {
                //     name: userData.fullname
                // });
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