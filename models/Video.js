// create mongoose schema to store video link
const mongoose = require('mongoose');
const {Schema} = mongoose;

const VideoSchema = new Schema({
    videoLink: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

});
const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;