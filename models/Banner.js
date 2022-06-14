// create mongoose schema to store video link
const mongoose = require('mongoose');
const {Schema} = mongoose;

const BannerSchema = new Schema({
    pictureLink: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

});
const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;