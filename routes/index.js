const express = require('express');
const router = express.Router();

//index
router.get('/', function(req, res) {
  res.render('index');
})

module.exports = router;
