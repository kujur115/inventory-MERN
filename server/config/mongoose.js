const mongoose = require("mongoose");
const env = require("./environment");
const DB = mongoose.connect(env.db);

module.exports = DB;
