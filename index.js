const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/keys");

require("./populate");

var router = require("./services/router");

mongoose.connect(config.mongoURI);

var app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(router);

var HOST = process.env.HOST || "127.0.0.1";
var PORT = process.env.PORT || 5000;
app.listen(PORT);
