const routerq = require("express").Router();
let Question = require("../models/Question");

//create route to create a question assign day 
routerq.post('/questions', async (req, res) => {
    const name = req.body.name
    const answer = req.body.answer
  
    try {
      const existingQuestionsCount = await Question.countDocuments();
      if (existingQuestionsCount >= 70) {
        return res.status(400).json({ error: 'Maximum number of questions reached' });
      }
  
      const randomDay = Math.floor(Math.random() * 7) + 1;
      const question = new Question({ name, answer, day: randomDay });
      await question.save();
  
      res.status(201).json(question);
    } catch (error) {
      console.error('Failed to create question', error);
      res.status(500).json({ error: 'Failed to create question' });
    }
  });

//create route to view questions 
//get all questions
routerq.route("/").get((req,res) =>{
    //here we view all students find()
    Question.find().then((getquestion) =>{
        res.json(getquestion)
    }).catch((err) =>{
        console.log(err)
    })
})


//get question by day
routerq.route("/day/:day").get(async (req,res) =>{
    let day = req.params.day;
    const question = await Question.find({day})
    .then((question) =>{
        res.status(200).send({status: "User fetched", question})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error while fetching", error: err.message})
    })
})  

  //delete 
  routerq.route("/").delete(async (req, res) => {
    try {
      await Question.deleteMany();
      res.status(200).send({ status: "Questions deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: "Error when deleting questions", error: err.message });
    }
  });
  


module.exports = routerq;
