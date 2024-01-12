const express = require("express");
const PORT = 8000;
const DB = require("./config/mongoose");
const app = express();

app.use("/", require("./routes"));

DB.then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
}).catch((err) => {
  console.log("error in connecting DB", err);
});
