var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET test page. */
router.get('/', function(req, res, next) {
  res.render('fetch',
  {
    title: 'Fetch',
    data: db.gsAttributes.allData("raw")
    //categories: db.gsCategories.allData("raw")
    //query: req.query,
    //singledata: JSON.stringify(db.gsAttributes.singleData(req.query.q,req.query.w))
  });

});

module.exports = router;
