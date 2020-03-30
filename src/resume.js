const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
const router = express.Router();
let resume = require("../db/dbResume");

/* GET users listing. */
/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        res.status(200).json({
            data: resume
        });
      } catch (err) {
        res.status(400).json({
          message: "Some error occured",
          err
        });
      }
});

app.use(cors());
app.use('/.netlify/functions/resume', router);

module.exports = app;
module.exports.handler = serverless(app);