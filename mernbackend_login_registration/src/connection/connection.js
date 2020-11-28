const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017:loginRegister", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connection successfull...`);
}).catch(e => console.log(`Connection error : ${e}`));