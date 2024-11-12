const express = require("express");
const router = express.Router();
const Person = require('../models/person')

// POST endpoint to add a new person
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    res.status(201).json(response);
    console.log("Response Data Saved");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error Saving Data" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Fetched");
      res.status(200).json(response);
    } else {
      res.status(500).json({ message: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//GET for person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Getting the response");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//PUT for update
router.put("/:id", async (req, res) => {

  try {
    
    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId,updatePersonData, {
      new: true,
      runValidators: true
    })

    if(!response){
      return res.status(404).json({message: "Person not found"})
    }

    console.log("Data Updated")
    res.status(200).json(response)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }

});

router.delete('/:id', async(req, res) =>{
  try {
    
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({message: "Person not found"});
    }
    console.log("Data Deleted");
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
})



module.exports = router;