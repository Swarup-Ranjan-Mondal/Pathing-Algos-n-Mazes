const express = require("express");
const app = express();

const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`App is running at http://127.0.0.1:${port}`);
});
