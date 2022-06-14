const express = require("express");
const router = express.Router();
const MarketingAdmin = require('../models/MarketingAdmin');
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route 1: Get All  using: Get  L
router.get("/getalldetail",async (req, res) => {
  let success = true;
    try {
      const marketing = await MarketingAdmin.find();
      res.status(200).json({marketing, success});
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  });


// Route 2: Add: POST 
router.post(
  "/addmarketing",
  fetchuser,
  [
    body("winneruserhandle", "Enter a userhandle ").isLength({ min: 1 }),
    body("winnerwalletaddress","wallet address must be at least 20 characters long").isLength({ min: 20 }),
  ],
  async (req, res) => {
    //if there are errors, send bad request with error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = true;
    try {
        
        const newMarketing = new MarketingAdmin({
            winneruserhandle: req.body.winneruserhandle,
            winnerwalletaddress: req.body.winnerwalletaddress,
            winneramount: req.body.winneramount,
            date: Date.now(),
        });
        await newMarketing.save();
        res.status(201).json({ newMarketing, message: "Marketing added successfully", success });
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  }
);


module.exports = router;