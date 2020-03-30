var express = require('express');
var router = express.Router();
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

module.exports = router;