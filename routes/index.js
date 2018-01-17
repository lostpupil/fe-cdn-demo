var express = require('express');
var router = express.Router();
var fs = require('fs');
var bdigest = fs.readFileSync('./.bdigest','utf8');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', bdigest: bdigest });
});

module.exports = router;
