const mongoose = require("mongoose");
// const env = require("./environment");
const DB = mongoose.connect(process.env.DB_URL);

module.exports = DB;
