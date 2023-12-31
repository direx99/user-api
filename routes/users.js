const router = require("express").Router();
let User = require("../models/User");

//create route to create a user
router.route("/").post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const age = Number(req.body.age);


    const newUser = new User({
        name,
        email,
        age
    })

    newUser.save().then(() =>{
        res.json("User added")
    }).catch((err) =>{
        console.log(err);
    })

})


//create route to view users 
//get all users
router.route("/").get((req,res) =>{
    //here we view all students find()
    User.find().then((getuser) =>{
        res.json(getuser)
    }).catch((err) =>{
        console.log(err)
    })
})

//get only 1 user by id
router.route("/:id").get(async (req,res) =>{
    let userID = req.params.id;
    const user = await User.findById(userID)
    .then((user) =>{
        res.status(200).send({status: "User fetched", user})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error while fetching", error: err.message})
    })
})


//update user by id
router.route("/:id").put(async (req,res) => {
    let userID = req.params.id;
    const{name,email,age} = req.body;

    const updateUser = {
        name,
        email,
        age
    }

    const update = await User.findByIdAndUpdate(userID,updateUser).then(() =>{

    res.status(200).send({status:"User updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error when Updating", error: err.message});
    })
})



//delete route 
router.route("/:id").delete(async (res,rep) =>{
    let userID = req.params.id;

    await User.findByIdAndDelete(userID).then(() =>{
        res.status(200).send({status: "User deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error when deleting", error: err.message});
    })
})

//export
module.exports = router;
