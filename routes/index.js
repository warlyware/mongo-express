var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var Question = mongoose.model('Question', {
  body: String,
  email: String,
  createdAt: Date
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongo API' });
});

router.get('/test', function(req, res, next) {
  res.send('Just testing');
});

router.post('/questions', function(req, res) {
  var question = new Question(req.body);
  question.createdAt = new Date();
  question.save(function(err, savedQuestion) {
    res.send(savedQuestion);
  });
});

router.post('/test', function(req, res, next) {
  var response = req.body;  
  response.serverTime = new Date();  //Add serverTime property to response obj
  res.json(response);
});

// router.get('/users', function(req, res, next) {
//   User.find({}, function(err, data) {
//     console.log(data);
//     res.json(data);
//   });
// });

module.exports = router;