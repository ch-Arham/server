const express = require("express");
const router = express.Router();
const Video = require('../models/Video');
const fetchuser = require("../middleware/fetchuser");

//Rote 1: Get current video link
router.get("/getvideolink",async (req, res) => {
    let success = true;
      try {
        const video = await Video.find();
        res.status(200).json({video, success});
      } catch (err) {
        success = false;
        console.log(err.message);
        res.status(500).json({message:"Internal Server Error",success});
      }
});

//Rote 2: Add A video link using: POST  Login Required
router.post(
    "/addvideolink",
    fetchuser,
    async (req, res) => {
      let success = true;
      try {
        
        const { videoLink } = req.body;
        
        const video = await Video.create({
          videoLink
        });

        const count = await Video.find().count();
        let deleted;
        if(count>1){
            const test = await Video.find();
            deleted = await Video.findByIdAndDelete(test[0]._id.toString());
        }
  
        res.json({video,success, deleted});
      } catch (err) {
        success = false;
        console.log(err.message);
        res.status(500).json({message:"Internal Server Error",success});
      }
    }
);

module.exports = router;