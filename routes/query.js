var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET test page. */
router.get('/', function(req, res, next) {
  res.json({
    attribute: req.query.q,
    keys: db.gsAttributes.singleData(req.query.q)
  });
});
router.get('/gpd', function(req, res, next) {
  res.json({
    attribute: req.query.q,
    keys: db.gsCategories.singleData(req.query.q)
  });
});

module.exports = router;
