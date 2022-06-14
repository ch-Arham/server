const mongoose = require('mongoose');
const {Schema} = mongoose;
const MarketingAdminSchema = new Schema({
    winneruserhandle: {
        type: String,
        required: true,
    },
    winnerwalletaddress: {
        type: String,
        required: true,
    },
    winneramount: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },

});
const MarketingAdmin = mongoose.model('MarketingAdmin', MarketingAdminSchema);

module.exports = MarketingAdmin;