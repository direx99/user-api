const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symptomSchema = new Schema({

    name : {
        //data type of attribute
        type : String,
        //not null validation
        default: []

    },
    description : {
        //data type of attribute
        type : String,
        //not null validation
        default: []

    },
    features : {
        //data type of attribute
        type : Array,
        //not null validation
        default: []

    },
    tips : {
        //data type of attribute
        type : Array,
        //not null validation
        required: true
    },
    keywords : {
        //data type of attribute
        type : Array,
        //not null validation
        required: true
    }

})

const Symptom = mongoose.model("Symptom",symptomSchema)
module.exports = Symptom