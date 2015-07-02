var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongo API' });
});

router.get('/test', function(req, res, next) {
  res.send('Just testing');
});

router.post('/test', function(req, res, next) {
  res.send('Just testing');
});

module.exports = router;