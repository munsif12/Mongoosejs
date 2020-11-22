const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/studestsRestfullApiTry", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection connected successfully..");
}).catch(err => {
    console.log(`Connection error : ${err}`);
})
