const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
// send the user to index html page inspite of the url
app.use(express.static(path.join(__dirname, "public")));
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(port);
