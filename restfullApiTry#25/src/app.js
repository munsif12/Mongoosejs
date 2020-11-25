const express = require("express");
require("./dbConnection/conn");//getting the connection
const Student = require("./studemtsModel/models");//getting the student Model
const port = process.env.PORT || 8000;
const app = express();
const Srouter = require("./Routers/routers");//getting all the router defined in routers file 
//middle ware
/*
    express.json() is use to recognize incoming requeest object as a JSON object 
    This method is called a middleware to use this use app.use(express.json())
    */
app.use(express.json());//to tell express file that data is comming in json format..
app.use(Srouter);//to use router we have to tell express file that we are using app.use(name=>route)
//routing 

app.listen(port, (req, res) => {
    console.log(`listing to the port ${port}`);
});
// to add router we have to follow just three steps
// 1: tell express file that u r using router like app.use(route) 
// 2: importe the router class from express => const router = new express.Router();//to use router 
// 3: make a seprate file and define all the possible routes like =>route.get("",(req,res)=>{}),,route.post("",(req,res)=>{}),,
// route.patch("",(req,res)=>{}) and then just export the routes defined bcoz of reusability if we dont export not other file will get the router so its mandatory to export routes...