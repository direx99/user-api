const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({

    //question 
    name : {
        //data type of attribute
        type : String,
        //not null validation
        required: true
    },
    answer: {
        //data type of attribute
        type : Array,
        //default value
        default: []
    },
    day : {
        //data type of attribute
        type : Number,
        //not null validation
        required: true
    }

})

const Question = mongoose.model("Question",questionSchema);
module.exports = Question;