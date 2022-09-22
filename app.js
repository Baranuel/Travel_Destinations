const express = require("express");
const { MongoDBNamespace } = require("mongodb");
const app = express();
let db
let connectionString = `mongodb://localhost:27017/crud`
const port = 3000;

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
    app.listen(3000)
  }
)

app.get("/testRoute", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});