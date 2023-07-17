const routers = require("express").Router();
let Question = require("../models/Question");
const Symptom = require("../models/Symtom");

//create route to create a question assign day 
routers.post('/', async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const features = req.body.features;
    const tips = req.body.tips;


    const newSymptom = new Symptom({
        name,
        description,
        features,
        tips
    })

    newSymptom.save().then(() =>{
        res.json("Symptom added")
    }).catch((err) =>{
        console.log(err);
    })
  });

//create route to view questions 
//get question by day
routers.route("/viewqq/:day").get(async (req,res) =>{
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
  routers.route("/delete").delete(async (req, res) => {
    try {
      await Question.deleteMany();
      res.status(200).send({ status: "Symptoms deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: "Error when deleting symptoms", error: err.message });
    }
  });
  


module.exports = routers;