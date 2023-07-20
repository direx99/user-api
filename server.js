const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
mongoose.set("strictQuery", false);
mongoose.connect(URL,{
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongo DB Connected Successfuly done !");
})

//importing user schema
const userRouter = require("./routes/users.js");

//import question schema
const questionRouter = require("./routes/questions.js");

//import symptom schema
const symptomRouter = require("./routes/symptoms.js");

//to load the users page
app.use("/user",userRouter)

//load questions page
app.use("/quest",questionRouter)

//to load the users page
app.use("/symptom",symptomRouter)

app.listen(PORT,()=>{
    console.log(`server is up & PORT is "${PORT}`);
})