const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.send('Halaman Dashboard')
})

router.get('/about',function(req, res){
    res.send('About School')    
})

router.get('/contact', function(req, res){
    res.send('Contact Us')
})

module.exports = router;