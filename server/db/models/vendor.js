const mongoose = require("mongoose");

const vendor = mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    address: String,
    password: String,
})

module.exports = mongoose.model('Vendor', vendor)