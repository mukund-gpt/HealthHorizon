const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is Listening to port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("QWERTY");
});
