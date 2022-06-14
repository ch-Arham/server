const express = require("express");
const router = express.Router();
const Marketing = require('../models/Marketing');
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//Route 1: Get All  using: Get  Login Required
router.get("/getalldetail",fetchuser,async (req, res) => {
  let success = true;
    try {
      const marketing = await Marketing.find();
      res.status(200).json({marketing, success});
    } catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error",success});
    }
  });


// Route 2: Add: POST --> by user (anyone can add)
router.post(
  "/addmarketing",
  [
    body("userhandle", "Enter a userhandle ").isLength({ min: 1 }),
    body("walletaddress","wallet address must be at least 20 characters long").isLength({ min: 20 }),
  ],
  async (req, res) => {
    //if there are errors, send bad request with error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = true;
    try {
        // find if userhandle already exists
        const marketing = await Marketing.findOne({ userhandle: req.body.userhandle });
        if (marketing) {
            success = false;
            return res.status(400).json({ message: "Userhandle already exists" });
        }
        // if not, create a new marketing
        const newMarketing = new Marketing({
            userhandle: req.body.userhandle,
            walletaddress: req.body.walletaddress,
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

//Route 3: Delete the entire collection using: DELETE  Login Required
router.delete('/deletalldocuments', fetchuser, async (req,res)=>{
  let success = true;
  try{
    await Marketing.deleteMany();
    res.status(200).json({message:"Marketing collection deleted successfully",success});
  }catch (err) {
      success = false;
      console.log(err.message);
      res.status(500).json({message:"Internal Server Error", success});
    }
});

module.exports = router;