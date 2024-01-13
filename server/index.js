const express = require("express");
const PORT = 8000;
const cors = require("cors");
const DB = require("./config/mongoose");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

DB.then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
}).catch((err) => {
  console.log("error in connecting DB", err);
});
