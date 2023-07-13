const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name : {
        //data type of attribute
        type : String,
        //not null validation
        required: true
    },
    email : {
        //data type of attribute
        type : String,
        //not null validation
        required: true
    },
    age : {
        type : Number,
        required : true
    }
})

const User = mongoose.model("User",userSchema);
module.exports = User;