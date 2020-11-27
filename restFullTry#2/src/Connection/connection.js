const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/secondTry", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log("Connection Created...");
}).catch(error => {
    console.error(`Connection error : ${error}`);
});