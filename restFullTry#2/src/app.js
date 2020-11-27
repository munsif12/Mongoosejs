const express = require("express");
const routes = require("./routers/routers");
require("./Connection/connection");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());//to tell express that body is sending json format data.
app.use(routes);//defining all the routes like post,get,patch etc..

app.listen(port, (req, res) => {
    console.log(`Listenting to ${port}`);
});