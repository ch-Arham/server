const express = require("express");
const router = express.Router();
const BugBounty = require('../models/BugBounty');
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Rote 1: Get All the notifications using: Get  Login Required
router.get("/getbugbounty",async (req, res) => {
  let success = true;
    try {
      const bugbounty = await BugBounty.find();
      res.status(200).json({bugbounty, success});
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  });


//Rote 2: Add A Notification using: POST  Login Required
router.post(
  "/addbugbounty",
  fetchuser,
  [
    body("title", "Enter a valid title  ").isLength({ min: 1 }),
    body("detail","Detail must be at least 1 characters long").isLength({ min: 1 }),
  ],
  async (req, res) => {
    //if there are errors, send bad request with error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = true;
    try {
      const { title, prize, email, detail } = req.body;
      const bugbounty = await BugBounty.create({
        title,
        prize,
        email,
        detail
      });

      res.json({bugbounty,success});
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  }
);

//Rote 3: Delete An Existing Note using: DELETE  Login Required
router.delete('/deletebugbounty/:id', fetchuser, async (req,res)=>{
  let success = true;
  try{
      //Find the note to delete and delete it
      let bugbounty = await BugBounty.findById(req.params.id);
      if(!bugbounty){return res.status(404).send("Not Found");}
      
      bugbounty = await BugBounty.findByIdAndDelete(req.params.id);
  
      res.json({success,bugbounty});
  }catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error", success});
    }
});

module.exports = router;