const mongoose = require("mongoose");
const router = require("../routes/users");
mongoose.connect("mongodb://localhost/codeial_development",{
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Successfull Connected to the Database");
});

module.exports = db;
module.exports = router;
