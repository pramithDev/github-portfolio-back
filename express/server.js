'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
var router = express.Router();

// ROUTES
var indexRouter = require('./routes/index');
var sidenavRouter = require('./routes/sidenav');
var portfoliosRouter = require('./routes/portfolios');
var resumeRouter = require('./routes/resume');
var sendRouter = require('./routes/send');

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use(express.static(path.join(__dirname, '../public')));


// ROUTES
app.use('/', indexRouter);
app.use('/.netlify/functions/sidenav', sidenavRouter);
app.use('/.netlify/functions/portfolios', portfoliosRouter);
app.use('/.netlify/functions/resume', resumeRouter);
app.use('/.netlify/functions/send', sendRouter);

module.exports = app;
module.exports.handler = serverless(app);