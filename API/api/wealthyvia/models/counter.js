const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    _id :  String,
    seq :  Number
});

module.exports = mongoose.model('counter', counterSchema);
