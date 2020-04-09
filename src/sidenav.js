const express = require("express");
const helmet = require('helmet');
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
app.use(helmet());
const router = express.Router();
let sidenav = require("../db/dbSidenav");

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
      res.status(200).json({
          data: sidenav
      });
    } catch (err) {
      res.status(400).json({
        message: "Some error occured",
        err
      });
    }
});

app.use(cors());
app.use('/.netlify/functions/sidenav', router);

module.exports = app;
module.exports.handler = serverless(app);