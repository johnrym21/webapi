const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controllers/controller.js');
const app = express().use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({limit: '50mb'}))

Controller(app);

app.listen(5000);
console.log('listening on port 5000');