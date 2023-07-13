const routerq = require("express").Router();
let Question = require("../models/Question");

//create route to create a question
routerq.route("/cq").post((req,res) => {
    const name = req.body.name;
    const problem = req.body.problem;
    const tips = req.body.tips;
    const result = Number(req.body.result);
    const answers = req.body.answers;


    const newQuestion = new Question({
        name,
        problem,
        tips,
        result,
        answers
    })

    newQuestion.save().then(() =>{
        res.json("Question added")
    }).catch((err) =>{
        console.log(err);
    })

})

//create route to view questions 
//get all questions
routerq.route("/viewq").get((req,res) =>{
    //here we view all students find()
    Question.find().then((getquestion) =>{
        res.json(getquestion)
    }).catch((err) =>{
        console.log(err)
    })
})


//get question by name
routerq.route("/viewqq/:name").get(async (req,res) =>{
    let name = req.params.name;
    const question = await Question.findOne({name})
    .then((question) =>{
        res.status(200).send({status: "User fetched", question})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error while fetching", error: err.message})
    })
})
module.exports = routerq;