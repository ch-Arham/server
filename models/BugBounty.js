// create mongoose schema to store video link
const mongoose = require('mongoose');
const {Schema} = mongoose;

const BugBountySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    prize: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

});
const BugBounty = mongoose.model('BugBounty', BugBountySchema);

module.exports = BugBounty;