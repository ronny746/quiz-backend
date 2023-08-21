const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    profile: {
        type: String,

    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);
