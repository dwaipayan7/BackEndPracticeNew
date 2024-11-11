const express = require('express')
const MenuItem = require('../models/menu')
const router = express.Router();


// POST endpoint to add a new menu
router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      res.status(201).json(response);
      console.log("Response Data Saved");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error Saving Data" });
    }
  });
  
  // GET endpoint for menu
  router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("Getting the response");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/:taste", async (req, res) => {
    try {
      const tasteType = req.params.taste;
      if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
        const response = await MenuItem.find({taste: tasteType});
        console.log("Fetched");
        res.status(200).json(response);
      } else {
        res.status(500).json({ message: "Invalid taste type" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  module.exports = router;