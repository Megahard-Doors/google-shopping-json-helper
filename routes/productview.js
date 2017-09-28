const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
  const myheaders = req.headers;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.render('productview',
  {
    title: 'Product View',
    data: db.gsAttributes.allData("raw"),
    mheaders: myheaders,
    //query: req.query,
    //singledata: JSON.stringify(db.gsAttributes.singleData(req.query.q,req.query.w))
  });
});

module.exports = router;
