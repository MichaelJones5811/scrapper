// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
//app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// give server access to routes
var routes = require("./controller/apiRoutes.js");
// site routes
app.use("/", routes);
// Database configuration with mongoose
mongoose.connect("mongodb://localhost/scraper_db");
//mongoose.connect("mongodb://localhost/week18day3mongoose");
//mongoose.connect("mongodb://whtmymfnam:password1@ds135812.mlab.com:35812/scraper_db");
//mongodb://<whtmymfnam>:<password1>@ds135812.mlab.com:35812/scraper_db
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});
// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});