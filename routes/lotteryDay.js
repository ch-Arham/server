const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const LotteryDayCheck = require("../models/LotteryDayCheck");

//Rote 1: Get current video link
router.get("/", async (req, res) => {
    let success = true;
    try {
        const lotteryDays = await LotteryDayCheck.find();
        res.status(200).json({ lotteryDays, success });
    } catch (err) {
        success = false;
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error", success });
    }
});

// router.post(
//     "/",
//     // fetchuser,
//     async (req, res) => {
//         let success = true;
//         try {

//             // console.log(req.body);

//             const lotteryDay = await LotteryDayCheck.create({
//                 day:"Tuesday",
//                 status:true
//             });
            
//             res.json({ lotteryDay, success });
//         } catch (err) {
//             success = false;
//             console.log(err.message);
//             res.status(500).json({ message: "Internal Server Error", success });
//         }
//     }
// );

router.put(
    "/update/:id",
    // fetchuser,
    async (req, res) => {
        let success = true;
        try {

            const lotteryDay = await LotteryDayCheck.findByIdAndUpdate(req.params.id,{
                status:req.body.status
            });
            
            res.json({ lotteryDay, success });
        } catch (err) {
            success = false;
            console.log(err.message);
            res.status(500).json({ message: "Internal Server Error", success });
        }
    }
);



module.exports = router;