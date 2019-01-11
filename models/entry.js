const mongoose = require('mongoose');


const entrySchema = mongoose.Schema({

    url: {
        type: String,
        // unique: true
    },
    time: {
        type: Number,
        default: 0,
    },
    title: String,
    notes: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This one help us using the populate
        required: true
    },

});

module.exports = mongoose.model('Entry', entrySchema);