const express = require("express");
const app = express();
const port = 8000;

const db = require("./config/mongoose");
//Setting Up Ststics
app.use(express.static("./assets"));

// app.use(app.router);
// routes.initalize(app)
//Use Express Layouts
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

//Ectract Styles and Scripts from sub-pages into layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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

///try tu publish changes 
