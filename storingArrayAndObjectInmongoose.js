const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/tryArrayObj", {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("connection successfull");
}).catch(error => {
    console.log(`error while connection : ${error}`)
})
const mainSchema = new mongoose.Schema({
    name: String,
    cgpa: [Number],
});
var tryarray = new mongoose.model("tryarray", mainSchema);
const addone = async () => {
    try {
        var munsifdata = await tryarray({
            name: "arslan",
            cgpa: [2, 3]
        })
        munsifdata.save();
    } catch (error) {
        console.log(`error while saving : ${error}`)
    }

}
addone();

app.get("/try", async (req, res) => {
    try {
        const result = await tryarray.find().sort();
        res.send(result)
    } catch (error) {
        console.log(`error while gettting : ${error}`)
    }
});
app.listen(8000, (req, res) => {
    console.log("listening");
});

