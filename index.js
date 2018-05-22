const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/keys");

const router = require("./services/router");

mongoose.connect(config.mongoURI);

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(router);

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 5000;
app.listen(PORT);
