const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }

});

module.exports = mongoose.model('User', userSchema);