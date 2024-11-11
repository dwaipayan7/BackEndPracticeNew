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


module.exports = router;