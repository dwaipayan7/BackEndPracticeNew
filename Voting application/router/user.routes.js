const express = require("express");
const router = express.Router();
const User = require('../models/user')
const {jwtAuthMiddleware, generateToken} = require('../jwt/jwt')

// POST endpoint to add a new person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newUser = new User(data);
    const response = await newUser.save();
    console.log("Response Data Saved");

    const payload = {
        id: response.id,
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token:", token);

    // Send a single response
    res.status(201).json({ response: response, token:token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error Saving Data" });
  }
});


router.post('/login', async(req, res) => {

    try {
        const {aadharCardNumber, password} = req.body;

        const user = await Person.findOne({aadharCardNumber:aadharCardNumber});
    
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({error: "Invalid username or password"});
        }
    
        //generate token
        const payload = {
            id: user.id
        }
        const token = generateToken(payload)
    
        res.json({token})
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }


})

router.get('/profile', jwtAuthMiddleware, async (req,res)=>{
    try {
        
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal server Error"})
    }
})


//PUT for update
router.put("/profile/password", async (req, res) => {

  try {
    
    const userId = req.user;

    const {currentPassword, newPassword} = req.body;

    const user = await User.findById(userId);



  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }

});




module.exports = router;