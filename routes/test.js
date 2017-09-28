var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET test page. */
router.get('/', function(req, res, next) {
  res.render('test',
  {
    title: 'Search Queries',
    data: db.gsAttributes.allData("raw"),
    query: req.query,
    singledata: JSON.stringify(db.gsAttributes.singleData(req.query.q,req.query.w))
  });

});

module.exports = router;
