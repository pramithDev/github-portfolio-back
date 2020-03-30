const express = require("express");
const serverless = require("serverless-http");

const app = express();
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

app.use('/.netlify/functions/sidenav', router);

module.exports = app;
module.exports.handler = serverless(app);