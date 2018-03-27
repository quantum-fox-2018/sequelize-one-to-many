var express = require('express')
var router = express.Router()
express().set('view engine', 'ejs')


router.get('/', function(req,res){
  res.render('home.ejs')
})

module.exports = router
