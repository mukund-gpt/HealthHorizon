const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is Listening to port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("QWERTY");
});
