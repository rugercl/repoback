const mongoose = require('mongoose');

const data = mongoose.model('users', {
    username: String,
    password: String,

})

let arr = []

module.exports = data;