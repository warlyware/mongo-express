var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var Question = mongoose.model('Question', {
  body: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  createdAt: {type: Date, default: Date.now }
});

Question.on('index', function(err) {
  
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongo API' });
});

router.get('/test', function(req, res, next) {
  res.send('Just testing');
});

router.get('/questions', function(req, res) {
  Question.find({}, function(err, data) {
    res.json(data);
  })
});

router.post('/questions', function(req, res) {
  var question = new Question(req.body);
  question.createdAt = new Date();
  console.log(req.body);
  question.save(function(err, savedQuestion) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'Validation Failed'});
    }
    res.json(savedQuestion);
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