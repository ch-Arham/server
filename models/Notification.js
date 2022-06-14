// create mongoose schema to store video link
const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotificationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    notification: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

});
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;