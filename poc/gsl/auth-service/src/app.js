const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

module.exports = app;