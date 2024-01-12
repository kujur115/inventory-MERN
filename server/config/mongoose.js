const mongoose = require('mongoose')
const DB= mongoose.connect('mongodb://0.0.0.0:27017/IMS');

module.exports = DB;