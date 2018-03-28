var express = require('express');
var router = express.Router();
const model = require('../models');

router.get('/', function (req, res) {
  res.render('index', {title:'Teachers Data'});
});

module.exports = router;
