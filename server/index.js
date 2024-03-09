const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const DB = require("./config/mongoose");
const Auth = require("./config/middleware");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // allow to run on different ports.
    credentials: true,
  })
);

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
