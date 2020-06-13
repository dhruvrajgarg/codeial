const express = require("express");
const app = express();
const port = 8000;

//Setting Up Ststics
app.use(express.static("./assets"));

//Use Express Layouts
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

//Ectract Styles and Scripts from sub-pages into layouts
app.use("layout extractStyles", true);
app.use("layout extractScripts", true);

// Use Express Router
app.use("/", require("./routes"));

//Set View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the Server: ${err}`);
    return;
  }
  console.log("Server Running Successfully on port : ", port);
});
