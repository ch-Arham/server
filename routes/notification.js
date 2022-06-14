const express = require("express");
const router = express.Router();
const Notification = require('../models/Notification');
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Rote 1: Get All the notifications using: Get  Login Required
router.get("/fetchallnotification",async (req, res) => {
  let success = true;
    try {
      const notification = await Notification.find();
      res.status(200).json({notification, success});
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  });


//Rote 2: Add A Notification using: POST  Login Required
router.post(
  "/addnotification",
  fetchuser,
  [
    body("title", "Enter a valid title  ").isLength({ min: 3 }),
    body("notification","Notification must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors, send bad request with error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = true;
    try {
      const { title, notification, status } = req.body;
      //create a new user. await returns the resolved promise in this case the document created
      const noti = await Notification.create({
        title,
        notification,
        status,
      });

      res.json({noti,success});
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  }
);

//Rote 3: Delete An Existing Note using: DELETE  Login Required
router.delete('/deletenotification/:id', fetchuser, async (req,res)=>{
  let success = true;
  try{
      //Find the note to delete and delete it
      let notification = await Notification.findById(req.params.id);
      if(!notification){return res.status(404).send("Not Found");}
      
      notification = await Notification.findByIdAndDelete(req.params.id);
  
      res.json({success,notification});
  }catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error", success});
    }
});

module.exports = router;