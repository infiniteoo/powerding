// INITIALIZE DOTENV
require("dotenv").config();

const express = require("express");
const dbConnection = require("./database");
const morgan = require("morgan");
const session = require("express-session");

const passport = require("./passport");
const app = express();
const PORT = process.env.PORT || 7777;

// Route requires
const user = require("./routes/user");
const sounds = require("./routes/sounds");
const email = require("./routes/email");

// MIDDLEWARE
app.use(morgan("dev"));

// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sessions
app.use(
  session({
    secret: "bruce-is-a-cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use("/user", user);
app.use("/api", sounds);
app.use("/email", email);

app.use(express.static("public"));

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
