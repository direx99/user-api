const routers = require("express").Router();
let Symptom = require("../models/Symptom");

//create route to create a question assign day 
routers.post('/', async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const features = req.body.features;
    const tips = req.body.tips;
    const keywords = req.body.keywords;


    const newSymptom = new Symptom({
        name,
        description,
        features,
        tips,
        keywords
    })

    newSymptom.save().then(() =>{
        res.json("Symptom added")
    }).catch((err) =>{
      console.error('Failed to save symptom', err);
      res.status(500).json({ error: 'Failed to save symptom' });
    })
  });

  //get all symtoms
routers.route("/").get((req,res) =>{
  Symptom.find().then((getsymptom) =>{
      res.json(getsymptom)
  }).catch((err) =>{
      console.log(err)
  })
})

//delete 
routers.route("/").delete(async (req, res) => {
  try {
    await Symptom.deleteMany();
    res.status(200).send({ status: "Symptoms deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error when deleting symptoms", error: err.message });
  }
});

//create route to view symtoms
//get qsymtom by key word 
// routers.route("/keyword/:day").get(async (req,res) =>{
//   let keyword = req.params.day;
//   const symptom = await Symptom.find({ $text: { $search: keyword } })
//   .then((symptom) =>{
//       res.status(200).send({status: "User fetched", symptom})
//   }).catch((err) =>{
//       console.log(err.message);
//       res.status(500).send({status: "Error while fetching", error: err.message})
//   })
// }) 

// //keyword selection 
// routers.route("/keyword/:word").get(async (req, res) => {
//   try {
//     const keyword = req.params.word;

//     // Use a regular expression to perform a case-insensitive search for the keyword in the keywords array
//     const searchRegex = new RegExp(keyword, "i");

//     // Search for documents where any element in the keywords array matches the search keyword
//     const matchedSymptoms = await Symptom.find({ keywords: searchRegex });

//     res.status(200).send({ status: "Symptoms fetched", symptoms: matchedSymptoms });
//   } catch (err) {
//     console.error("Error while searching:", err);
//     res.status(500).send({ status: "Error while fetching symptoms", error: err.message });
//   }
// });

//keyword selection and sorting
// Updated route to handle multiple keywords
// Updated route to show symptoms that have all the entered keywords
routers.route("/keywords/:words").get(async (req, res) => {
  try {
    const keywords = req.params.words.split(","); // Assuming the keywords are separated by commas

    // Convert each keyword to a case-insensitive regex
    const searchRegexes = keywords.map(keyword => new RegExp(keyword, "i"));

    // Search for documents where all the keywords are present in the 'keywords' field
    const matchedSymptoms = await Symptom.find({ keywords: { $all: searchRegexes } });

    // Sort the matchedSymptoms array in descending order based on the number of matching keywords
    matchedSymptoms.sort((a, b) => b.keywords.filter(kw => searchRegexes.some(regex => regex.test(kw))).length - a.keywords.filter(kw => searchRegexes.some(regex => regex.test(kw))).length);

    //The top 5 collections
    const top5Symptoms = matchedSymptoms.slice(0, 5);

    res.status(200).send({ status: "Symptoms fetched", symptoms: top5Symptoms });
  } catch (err) {
    console.error("Error while searching:", err);
    res.status(500).send({ status: "Error while fetching symptoms", error: err.message });
  }
});




module.exports = routers;