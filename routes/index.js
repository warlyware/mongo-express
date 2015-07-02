var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongo API' });
});

router.get('/test', function(req, res, next) {
  res.send('Just testing');
});

router.post('/test', function(req, res, next) {
  var response = req.body;  
  response.serverTime = new Date();  //Add serverTime property to response obj
  res.json(response);
});

module.exports = router;