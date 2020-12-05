const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/loginRegister", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connection successfull...`);
}).catch(e => console.log(`Connection error : ${e}`));
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://munsif:Munsif__69@cluster0.zz3hz.mongodb.net/loginLogout?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });