const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({

    name : {
        //data type of attribute
        type : String,
        //not null validation
        required: true
    },
    problem : {
        //data type of attribute
        type : String,
        //not null validation
        required: true
    },
    tips : {
        //data type of attribute
        type : String,
        //not null validation
        required: true
    },
    result : {
        //data type of attribute
        type : String,
        //not null validation
        required: true
    },

})

const Question = mongoose.model("Question",userSchema);
module.exports = Question;