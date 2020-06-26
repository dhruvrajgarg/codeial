const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
//Used for Session Cookie 
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
//SCSS
const sassMiddleware = require("node-sass-middleware");
//Flash Messages
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.urlencoded());

app.use(cookieParser());

//Setting Up Ststics
app.use(express.static("./assets"));

//Use Express Layouts
app.use(expressLayouts);

//Ectract Styles and Scripts from sub-pages into layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Set View Engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Flash Messages Middleware 
app.use(flash());
app.use(customMware.setFlash);

app.use(passport.setAuthenticatedUser);
// Use Express Router
app.use("/", require("./routes"));
  

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the Server: ${err}`);
    return;
  }
  console.log("Server Running Successfully on port : ", port);
});


