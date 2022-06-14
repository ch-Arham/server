const express = require("express");
const router = express.Router();
const Banner = require('../models/Banner');
const fetchuser = require("../middleware/fetchuser");

//Rote 1: Get current video link
router.get("/", async (req, res) => {
    let success = true;
    try {
        const banners = await Banner.find();
        res.status(200).json({ banners, success });
    } catch (err) {
        success = false;
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error", success });
    }
});

//Rote 2: Add A video link using: POST  Login Required
router.post(
    "/addPictureLink",
    // fetchuser,
    async (req, res) => {
        let success = true;
        try {

            const { pictureLink } = req.body;
            // console.log(req.body);

            const banner = await Banner.create({
                pictureLink
            });
            
            res.json({ banner, success });
        } catch (err) {
            success = false;
            console.log(err.message);
            res.status(500).json({ message: "Internal Server Error", success });
        }
    }
);

router.delete(
    "/deleteBanner/:id",
    // fetchuser,
    async (req, res) => {
        let success = true;
        try {

            const banner = await Banner.findByIdAndDelete(req.params.id);
            res.json({ banner, success });
        } catch (err) {
            success = false;
            console.log(err.message);
            res.status(500).json({ message: "Internal Server Error", success });
        }
    }
);


module.exports = router;