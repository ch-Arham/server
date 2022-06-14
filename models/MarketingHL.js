const mongoose = require('mongoose');
const {Schema} = mongoose;
const MarketingHLSchema = new Schema({
    hashtag: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },

});
const MarketingHL = mongoose.model('MarketingHL', MarketingHLSchema);

module.exports = MarketingHL;