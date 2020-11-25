const express = require("express");
require("./dbConnection/conn");//getting the connection
const Student = require("./studemtsModel/models");//getting the student Model
const port = process.env.PORT || 8000;
const app = express();
const Srouter = require("./Routers/routers");
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