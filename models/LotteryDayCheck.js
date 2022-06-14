const mongoose = require('mongoose');
const {Schema} = mongoose;

const LotteryDayCheckSchema = new Schema({
    day: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
});
const LotteryDayCheck = mongoose.model('LotteryDay', LotteryDayCheckSchema);

module.exports = LotteryDayCheck;