'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

// ROUTES
var indexRouter = require('./routes/index');
var sidenavRouter = require('./routes/sidenav');
var portfoliosRouter = require('./routes/portfolios');
var resumeRouter = require('./routes/resume');
var sendRouter = require('./routes/send');

app.use(bodyParser.json());  // path must route to lambda
app.use(express.static(path.join(__dirname, '../public')));


// ROUTES
app.use('/.netlify/functions/', indexRouter);
app.use('/.netlify/functions/sidenav', sidenavRouter);
app.use('/.netlify/functions/portfolios', portfoliosRouter);
app.use('/.netlify/functions/resume', resumeRouter);
app.use('/.netlify/functions/send', sendRouter);

module.exports = app;
module.exports.handler = serverless(app);