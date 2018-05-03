const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Hotel');
const AppRouter = require('./router');
const router = AppRouter.Router;

mongoose.connect(keys.mongoURI);

const app = express();

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
