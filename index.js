const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controllers/controller.js');
const app = express().use(bodyParser.json());

Controller(app);

app.listen(5000);
console.log('listening on port 5000');