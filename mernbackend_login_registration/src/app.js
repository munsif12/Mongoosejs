const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./connection/connection");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.join(__dirname, "../public")));// defiining path for static files
app.set("view engine", "hbs");//telling express file to set up handle bars which is hbs
app.set("views", path.join(__dirname, "../templets/views"));//insted of looking views folder in look into templetsPath var
hbs.registerPartials(path.join(__dirname, "../templets/partials"))


app.get("/", (req, res) => {
    res.render("index");
});
app.listen(port, () => {
    console.log(`listenting to the request at ${port}`);
})