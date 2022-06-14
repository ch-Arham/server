const mongoose = require('mongoose');
const {Schema} = mongoose;
const MarketingSchema = new Schema({
    userhandle: {
        type: String,
        required: true,
    },
    walletaddress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

});
const Marketing = mongoose.model('Marketing', MarketingSchema);

module.exports = Marketing;