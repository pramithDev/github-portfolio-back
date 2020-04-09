const express = require("express");
const helmet = require('helmet');
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
app.use(helmet());
const router = express.Router();
let portfolios = require("../db/dbPortfolios");

/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
        res.status(200).json({
            data: portfolios
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
      let portfolio = portfolios.find(portfolio => portfolio.id === id);
      res.status(200).json({
        data: portfolio
      });
    } catch (err) {
      res.status(400).json({
        message: "Some error occured",
        err
      });
    }
});

app.use(cors());
app.use('/.netlify/functions/portfolios', router);

module.exports = app;
module.exports.handler = serverless(app);