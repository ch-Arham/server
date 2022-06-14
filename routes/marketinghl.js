const express = require("express");
const router = express.Router();
const MarketingHL = require('../models/MarketingHL');
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route 1: Get All  using: Get  L
router.get("/getmarketinghl",async (req, res) => {
  let success = true;
    try {
      const marketing = await MarketingHL.find();
      res.status(200).json({marketing, success});
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  });


// Route 2: Add: POST 
router.post(
  "/addmarketinghl",
  fetchuser,
  [
    body("hashtag", "Enter a hashtag ").isLength({ min: 1 }),
  ],
  async (req, res) => {
    //if there are errors, send bad request with error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = true;
    try {
        
        const newMarketingHL = new MarketingHL({
            hashtag: req.body.hashtag,
            link: req.body.link,
        });
        await newMarketingHL.save();

        const count = await MarketingHL.find().count();
        let deleted;
        if(count>2){
            const test = await MarketingHL.find();
            deleted = await MarketingHL.findByIdAndDelete(test[0]._id.toString());
        }

        res.status(201).json({  newMarketingHL,deleted,message: "MarketingHL added successfully", success });
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  }
);


module.exports = router;