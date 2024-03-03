const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const DB = require("./config/mongoose");
const app = express();
const Auth = require("./config/middleware");
const errorHandler = require("./middleWare/errorMiddleware");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/", require("./routes"));

// error middleware
app.use(errorHandler);

DB.then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
}).catch((err) => {
  console.log("error in connecting DB", err);
});
